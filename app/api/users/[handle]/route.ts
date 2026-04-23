import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ handle: string }> },
) {
  const { handle } = await context.params;
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json(null, { status: 503 });
  }
  try {
    const sql = neon(url);
    const user = await sql`
    SELECT
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        admin,
        profile_picture AS "profilePicture",
        handle
    FROM users
    WHERE handle = ${handle}`;
    return Response.json({ status: 200, user: user[0] });
  } catch {
    return Response.json({ status: 500, user: null });
  }
}
