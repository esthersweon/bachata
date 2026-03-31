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
    const lists = await sql`SELECT id, name FROM lists ORDER BY name`;
    const resultWithMovements = await Promise.all(
      lists.map(async (list: Record<string, any>) => {
        const listId = String(list.id);
        const listName = String(list.name);
        const movements = await sql`SELECT m.id, m.name FROM movements m
          JOIN lists_movements lm ON m.id = lm.movement_id
          WHERE lm.list_id = ${listId}`;
        return { id: listId, name: listName, movements };
      }),
    );

    return Response.json(resultWithMovements, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to get lists: ${(error as Error).message}` },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    const id = crypto.randomUUID();
    await sql`INSERT INTO lists (id, name) VALUES (${id}, ${name})`;

    return Response.json(
      { ok: true, id },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return Response.json(
      { ok: false },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
