import { List } from "@/app/types";
import { neon } from "@neondatabase/serverless";

export async function getListsOfMovements(handle?: string): Promise<{
  status: 200 | 503 | 500;
  lists: List[];
  error?: string;
}> {
  const url = process.env.POSTGRES_URL;
  if (!url) return { status: 503, lists: [] };

  try {
    const sql = neon(url);
    const userId = handle
      ? (await sql`SELECT id FROM users WHERE handle = ${handle}`)[0].id
      : "efbefbcd-e551-4e5c-9433-846d4b3a703f";

    const lists = await sql`
      SELECT l.id, l.name FROM lists l
      WHERE l.id IN (
        SELECT list_id FROM lists_movements WHERE user_id = ${userId}
      )
      ORDER BY LOWER(l.name)`;

    const listsWithMovements = await Promise.all(
      lists.map(async ({ id, name }) => {
        const listId = String(id);
        const listName = String(name);
        const movements =
          await sql`SELECT m.id, m.name, lm.checked FROM movements m
          JOIN lists_movements lm ON m.id = lm.movement_id
          WHERE lm.list_id = ${listId} AND lm.user_id = ${userId}`;
        return { id: listId, name: listName, movements };
      }),
    );

    return { status: 200, lists: listsWithMovements as List[] };
  } catch (error) {
    return { status: 500, lists: [], error: (error as Error).message };
  }
}

export async function getLists(): Promise<List[]> {
  const { lists } = await getListsOfMovements();
  return lists;
}
