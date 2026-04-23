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
    return Response.json(
      { movements: [] },
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const sql = neon(url);
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session

    const qPattern = `%${q}%`;
    const levelFilter = level ? sql`AND l.id = ${level}` : sql``;
    const categoryFilter = category
      ? sql`AND EXISTS (
          SELECT 1 FROM movements_categories mcf
          WHERE mcf.movement_id = m.id AND mcf.category_id = ${category}
        )`
      : sql``;

    const defaultStatusId = String(
      (await sql`SELECT id, name FROM statuses ORDER BY "order" LIMIT 1`)[0].id,
    );

    const statusFilter = status
      ? sql`AND COALESCE(um.status_id, ${defaultStatusId}) = ${status}`
      : sql``;

    const movements = await sql`
      SELECT
        m.id,
        m.name,
        m.description,
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
      WHERE
        (m.name ILIKE ${qPattern} OR m.description ILIKE ${qPattern})
        ${levelFilter}
        ${categoryFilter}
        ${statusFilter}
        AND cat.ids IS NOT NULL
      ORDER BY LOWER(m.name)
    `;

    return Response.json(
      { movements },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        movements: [],
        error: `Failed to get movements: ${(error as Error).message}`,
      },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const {
    id: movementId,
    statusId,
    description,
    name,
    levelId,
    categoryId,
    categoryIds: categoryIdsInput,
    prep,
    usage,
  } = await request.json();
  const categoryIds: string[] | undefined =
    categoryIdsInput != null
      ? categoryIdsInput
      : categoryId != null
        ? [categoryId]
        : undefined;
  const url = process.env.POSTGRES_URL;

  if (!url)
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });

  if (
    categoryIds !== undefined &&
    (!Array.isArray(categoryIds) || categoryIds.length === 0)
  ) {
    return Response.json(
      { ok: false, error: { message: "At least one category is required" } },
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const sql = neon(url);
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session

    const defaultStatusId = String(
      (await sql`SELECT id FROM statuses ORDER BY "order" LIMIT 1`)[0].id,
    );
    const patchStatus = statusId != null;

    const updateStatus = sql`
      INSERT INTO users_movements (id, movement_id, status_id, user_id)
      VALUES (
        ${crypto.randomUUID()},
        ${movementId},
        ${patchStatus ? statusId : defaultStatusId},
        ${userId}
      )
      ON CONFLICT (user_id, movement_id)
      DO UPDATE SET
        status_id = CASE
          WHEN ${patchStatus} THEN EXCLUDED.status_id
          ELSE users_movements.status_id
        END;`;

    const updateName = sql`UPDATE movements SET name = ${name} WHERE id = ${movementId}`;
    const updateDescription = sql`UPDATE movements SET description = ${description} WHERE id = ${movementId}`;
    const updatePrep = sql`UPDATE movements SET prep = ${prep} WHERE id = ${movementId}`;
    const updateUsage = sql`UPDATE movements SET usage = ${usage} WHERE id = ${movementId}`;
    const updateLevel = sql`UPDATE movements SET level_id = ${levelId} WHERE id = ${movementId}`;
    const deleteMovementCategories = sql`DELETE FROM movements_categories WHERE movement_id = ${movementId}`;
    const insertMovementCategory = (categoryIds ?? []).map(
      (cid: string) =>
        sql`INSERT INTO movements_categories (id, movement_id, category_id)
        VALUES (${crypto.randomUUID()}, ${movementId}, ${cid})`,
    );

    await sql.transaction(
      [
        updateStatus,
        name !== undefined ? updateName : null,
        description !== undefined ? updateDescription : null,
        prep !== undefined ? updatePrep : null,
        usage !== undefined ? updateUsage : null,
        levelId !== undefined ? updateLevel : null,
        ...(categoryIds !== undefined
          ? [deleteMovementCategories, ...insertMovementCategory]
          : []),
      ].filter((transaction) => transaction !== null),
    );

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
  const { name, description, levelId, categoryIds } = await request.json();

  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    !name ||
    !description ||
    !levelId ||
    !Array.isArray(categoryIds) ||
    categoryIds.length === 0
  ) {
    return Response.json(
      { ok: false, error: "Invalid payload" },
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const sql = neon(url);
    const statusId =
      await sql`SELECT id FROM statuses ORDER BY "order" LIMIT 1`;

    const movementId = crypto.randomUUID();
    const insertMovement = sql`INSERT INTO movements (id, name, description, level_id)
      VALUES (${movementId}, ${name}, ${description}, ${levelId})`;

    const insertMovementCategory = categoryIds.map(
      (categoryId: string) =>
        sql`INSERT INTO movements_categories (id, movement_id, category_id)
        VALUES (${crypto.randomUUID()}, ${movementId}, ${categoryId})`,
    );

    const userMovementId = crypto.randomUUID();
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session
    const insertUserMovement = sql`INSERT INTO users_movements (id, movement_id, status_id, user_id)
      VALUES (${userMovementId}, ${movementId}, ${statusId[0].id}, ${userId})`;

    await sql.transaction([
      insertMovement,
      ...insertMovementCategory,
      insertUserMovement,
    ]);

    return Response.json(
      { ok: true },
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { ok: false, error: (error as Error).message },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
