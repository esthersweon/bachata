import { neon } from "@neondatabase/serverless";
import { User } from "../types";

export async function getUsers() {
  const url = process.env.POSTGRES_URL;
  if (!url) return { status: 503, users: [] };

  try {
    const sql = neon(url);
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session

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
