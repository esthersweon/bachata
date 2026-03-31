import type { DanceEvent } from "@/app/types";
import { neon } from "@neondatabase/serverless";

export async function getEventsWithMeta(): Promise<{
  status: 200 | 503 | 500;
  events: DanceEvent[];
}> {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return { status: 503, events: [] };
  }

  try {
    const sql = neon(url);
    const rows = await sql`SELECT * FROM events ORDER BY date DESC`;
    return { status: 200, events: rows as DanceEvent[] };
  } catch {
    return { status: 500, events: [] };
  }
}

export async function getEvents(): Promise<DanceEvent[]> {
  const { events } = await getEventsWithMeta();
  return events;
}
