import { neon } from "@neondatabase/serverless";
import { User } from "../types";

export async function getUserById(id: string): Promise<User | null> {
  const url = process.env.POSTGRES_URL;
  if (!url || !id) return null;

  try {
    const sql = neon(url);
    const rows = (await sql`SELECT
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email, admin,
        profile_picture AS "profilePicture",
        handle,
        dance_role AS "danceRole"
      FROM users
      WHERE id = ${id}
      LIMIT 1`) as User[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getOtherUsers(userId: string) {
  const url = process.env.POSTGRES_URL;
  if (!url) return { status: 503, users: [] };

  try {
    const sql = neon(url);
    const users = await sql`
      SELECT
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email, admin,
        profile_picture AS "profilePicture",
        handle,
        dance_role AS "danceRole"
    FROM users
    WHERE id != ${userId}`;

    return { status: 200, users: users as User[] };
  } catch {
    return { status: 500, users: [] };
  }
}
