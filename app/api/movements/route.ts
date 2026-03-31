import { neon } from "@neondatabase/serverless";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const level = searchParams.get("level") ?? "";
  const category = searchParams.get("category") ?? "";
  const status = searchParams.get("status") ?? "";

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
    const statusFilter = status ? sql`AND m.status_id = ${status}` : sql``;

    const results = await sql`
      SELECT DISTINCT 
        m.id,
        m.name,
        m.description,
        l.name AS level,
        l.color AS "levelColor",
        c.name AS category,
        m.status_id AS "statusId"
      FROM movements m
      JOIN levels l ON m.level_id = l.id
      JOIN categories c ON m.category_id = c.id
      WHERE
        (m.name ILIKE ${qPattern} OR m.description ILIKE ${qPattern})
        ${levelFilter}
        ${categoryFilter}
        ${statusFilter}
      ORDER BY m.name`;

    return Response.json(results ?? [], {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to get movements: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function PATCH(request: Request) {
  const { id, statusId } = await request.json();
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    await sql`UPDATE movements SET status_id = ${statusId} WHERE id = ${id}`;
    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to update movement: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function POST(request: Request) {
  const { name, description, levelId, categoryId } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    await sql`INSERT INTO movements (id, name, description, level_id, category_id)
      VALUES (${crypto.randomUUID()}, ${name}, ${description}, ${levelId}, ${categoryId})`;

    return Response.json(
      { ok: true },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to add movement: ${(error as Error).message}` },
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
    const result = await sql`DELETE FROM movements WHERE id = ${id}`;

    return Response.json(result, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to delete movement: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
