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
    const statuses = await sql`SELECT id, name FROM statuses ORDER BY "order"`;
    const resultWithMovements = await Promise.all(
      statuses.map(async (status: Record<string, any>) => {
        const statusId = String(status.id);
        const statusName = String(status.name);
        const movements =
          await sql`SELECT m.id, m.name FROM movements m WHERE m.status_id = ${statusId}`;
        return { id: statusId, name: statusName, movements };
      }),
    );

    return Response.json(resultWithMovements, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to get statuses: ${(error as Error).message}` },
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
    await sql`INSERT INTO statuses (id, name) VALUES (${id}, ${name})`;

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
