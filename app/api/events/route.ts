import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";
import { Event } from "../../types";

export async function GET(request: NextRequest): Promise<Response> {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return Response.json([], {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(url);
    const events =
      (await sql`SELECT * FROM events ORDER BY date DESC`) as Event[];
    return Response.json(events, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json([], {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
