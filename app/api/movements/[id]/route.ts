import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(
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
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session
    const defaultStatusId = String(
      (await sql`SELECT id, name FROM statuses ORDER BY "order" LIMIT 1`)[0].id,
    );

    const results = await sql`
        SELECT
          id,
          name,
          description,
          level,
          "levelColor",
          category,
          "statusId",
          "statusName"
        FROM (
          SELECT DISTINCT
            m.id,
            m.name,
            m.description,
            l.name AS level,
            l.color AS "levelColor",
            c.name AS category,
            COALESCE(um.status_id, ${defaultStatusId}) AS "statusId",
            s.name AS "statusName"
          FROM movements m
          JOIN levels l ON m.level_id = l.id
          JOIN movements_categories mc ON m.id = mc.movement_id
          JOIN categories c ON mc.category_id = c.id
          LEFT JOIN users_movements um
            ON m.id = um.movement_id AND um.user_id = ${userId}
          LEFT JOIN statuses s ON s.id = COALESCE(um.status_id, ${defaultStatusId}) 
          WHERE m.id = ${id}
        ) AS movement_rows`;

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
