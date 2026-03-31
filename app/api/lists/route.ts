import { getListsWithStatus } from "@/app/lib/lists";
import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { status, lists } = await getListsWithStatus();
  return Response.json(lists, {
    status,
    headers: { "Content-Type": "application/json" },
  });
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
