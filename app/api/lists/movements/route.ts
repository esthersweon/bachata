import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    // const result = await sql`SELECT id, name FROM lists ORDER BY name`;

    // return Response.json(result, {
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch {
    // return Response.json([], {
    //   status: 500,
    //   headers: { "Content-Type": "application/json" },
    // });
  }
}

export async function POST(request: NextRequest) {
  const { movementId, listIds } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    const ids = Array.isArray(listIds) ? listIds : [];
    if (ids.length > 0) {
      await sql.transaction(
        ids.map(
          (listId: string) =>
            sql`INSERT INTO lists_movements (id, movement_id, list_id)
            VALUES (${crypto.randomUUID()}, ${movementId}, ${listId})`,
        ),
      );
    }

    return Response.json(
      { ok: true },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to add movement to lists: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
