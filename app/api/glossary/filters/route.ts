import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json(
      { categories: [], levels: [] },
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const sql = neon(url);
    const categories =
      await sql`SELECT id, name FROM categories ORDER BY "order"`;
    const levels = await sql`SELECT id, name, color FROM levels`;

    return Response.json(
      { categories, levels },
      { headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return Response.json(
      { categories: [], levels: [] },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: NextRequest) {
  const { name, description } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    const result =
      await sql`INSERT INTO categories (id, name, description) VALUES (${crypto.randomUUID()}, ${name}, ${description})`;
    return Response.json(
      { ok: true },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { ok: false, error: (error as Error).message },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
