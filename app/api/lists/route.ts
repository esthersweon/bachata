import { getListsOfMovements } from "@/app/lib/lists";
import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle");
  const { status, lists } = await getListsOfMovements(handle ?? undefined);
  return Response.json(lists, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const { name, movementIds = [] } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    const listId = crypto.randomUUID();
    const insertList = sql`INSERT INTO lists (id, name) VALUES (${listId}, ${name})`;
    const insertMovements = movementIds.map(
      (movementId: string) => sql`
        INSERT INTO lists_movements (id, movement_id, list_id)
        VALUES (${crypto.randomUUID()}, ${movementId}, ${listId})`,
    );

    await sql.transaction([insertList, ...insertMovements]);

    return Response.json(
      { ok: true, id: listId },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        ok: false,
        error: `Failed to create list: ${(error as Error).message}`,
      },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const { id, name, movementIds = [] } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    await sql.transaction([
      sql`UPDATE lists SET name = ${name} WHERE id = ${id}`,
      sql`DELETE FROM lists_movements WHERE list_id = ${id}`,
      ...movementIds.map(
        (movementId: string) =>
          sql`INSERT INTO lists_movements (id, movement_id, list_id) VALUES (${crypto.randomUUID()}, ${movementId}, ${id})`,
      ),
    ]);
    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to update list: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    await sql`DELETE FROM lists WHERE id = ${id}`;

    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        ok: false,
        error: `Failed to delete list: ${(error as Error).message}`,
      },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
