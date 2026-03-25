import { neon } from "@neondatabase/serverless";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const level = searchParams.get("level") ?? "";
  const category = searchParams.get("category") ?? "";

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);

    const qPattern = `%${q}%`;
    const levelFilter = level ? sql`AND l.id = ${level}` : sql``;
    const categoryFilter = category ? sql`AND c.id = ${category}` : sql``;

    const results =
      await sql`SELECT m.id, m.name, m.description, l.name as level, l.color as levelColor, c.name as category FROM movements m
      JOIN levels l ON m.level_id = l.id
      JOIN categories c ON m.category_id = c.id
      WHERE (m.name ILIKE ${qPattern} OR m.description ILIKE ${qPattern})
      ${levelFilter}
      ${categoryFilter}`;

    return Response.json(results ?? [], {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json([], {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  const { name, description, level, category } = await request.json();

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
      await sql`INSERT INTO movements (id, name, description, level_id, category_id)
      VALUES (${crypto.randomUUID()}, ${name}, ${description}, ${level}, ${category})`;

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to add movement" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
