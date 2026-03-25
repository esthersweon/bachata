import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json(
      { categories: [], levels: [] },
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const sql = neon(url);
    const categories =
      await sql`SELECT id, name FROM categories ORDER BY "order"`;
    const levels = await sql`SELECT id, name, color FROM levels`;

    return Response.json(
      {
        categories: [{ id: "", name: "All" }, ...categories],
        levels: [{ id: "", name: "All", color: "gray" }, ...levels],
      },
      { headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return Response.json(
      { categories: [], levels: [] },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
