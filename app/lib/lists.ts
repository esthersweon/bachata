import { List } from "@/app/types";
import { neon } from "@neondatabase/serverless";

export async function getListsOfMovements(): Promise<{
  status: 200 | 503 | 500;
  lists: List[];
}> {
  const url = process.env.POSTGRES_URL;
  if (!url) return { status: 503, lists: [] };

  try {
    const sql = neon(url);
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session
    const lists = await sql`SELECT id, name FROM lists ORDER BY LOWER(name)`;
    const listsWithMovements = await Promise.all(
      lists.map(async (list: Record<string, any>) => {
        const listId = String(list.id);
        const listName = String(list.name);
        const movements =
          await sql`SELECT m.id, m.name, lm.checked FROM movements m
          JOIN lists_movements lm ON m.id = lm.movement_id
          WHERE lm.list_id = ${listId} AND lm.user_id = ${userId}`;
        return { id: listId, name: listName, movements };
      }),
    );

    return { status: 200, lists: listsWithMovements as List[] };
  } catch (error: unknown) {
    return { status: 500, lists: [] };
  }
}

export async function getLists(): Promise<List[]> {
  const { lists } = await getListsOfMovements();
  return lists;
}
