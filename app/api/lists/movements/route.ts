import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const { movementId, listId, checked } = await request.json();
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const sql = neon(url);
    await sql`UPDATE lists_movements SET checked = ${checked}
    WHERE movement_id = ${movementId} AND list_id = ${listId} AND user_id = ${userId}`;
    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      { error: `Failed to update list movement: ${(error as Error).message}` },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function DELETE(request: NextRequest) {
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
            sql`DELETE FROM lists_movements WHERE movement_id = ${movementId} AND list_id = ${listId}`,
        ),
      );
    }

    return Response.json(
      { ok: true },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        error: `Failed to remove movement from lists: ${(error as Error).message}`,
      },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
