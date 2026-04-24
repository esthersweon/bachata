import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const url = process.env.POSTGRES_URL;
  const userId = request.nextUrl.searchParams.get("userId");

  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    const defaultStatusId = String(
      (await sql`SELECT id, name FROM statuses ORDER BY "order" LIMIT 1`)[0].id,
    );

    const results = await sql`
        SELECT
          m.id,
          m.name,
          m.description,
          m.prep,
          m.usage,
          um.notes,
          m.level_id AS "levelId",
          l.name AS level,
          l.color AS "levelColor",
          COALESCE(cat.names, ARRAY[]::text[]) AS categories,
          COALESCE(cat.ids, ARRAY[]::text[]) AS "categoryIds",
          COALESCE(um.status_id, ${defaultStatusId}) AS "statusId",
          s.name AS "statusName"
        FROM movements m
        JOIN levels l ON m.level_id = l.id
        LEFT JOIN LATERAL (
          SELECT
            array_agg(c.name ORDER BY c.name) AS names,
            array_agg(c.id::text ORDER BY c.name) AS ids
          FROM movements_categories mc
          JOIN categories c ON c.id = mc.category_id
          WHERE mc.movement_id = m.id
        ) cat ON true
        LEFT JOIN users_movements um
          ON m.id = um.movement_id AND um.user_id = ${userId}
        LEFT JOIN statuses s ON s.id = COALESCE(um.status_id, ${defaultStatusId})
        WHERE m.id = ${id}
    `;

    return Response.json(results[0] ?? null, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json([], {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    const deleteMovement = sql`DELETE FROM movements WHERE id = ${id}`;
    const deleteFromUsers = sql`DELETE FROM users_movements WHERE movement_id = ${id}`;
    const deleteFromCategories = sql`DELETE FROM movements_categories WHERE movement_id = ${id}`;
    const deleteFromLists = sql`DELETE FROM lists_movements WHERE movement_id = ${id}`;
    const deleteFromCombos = sql`DELETE FROM combos_movements WHERE movement_id = ${id}`;

    sql.transaction([
      deleteMovement,
      deleteFromUsers,
      deleteFromCategories,
      deleteFromLists,
      deleteFromCombos,
    ]);

    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to delete movement: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
