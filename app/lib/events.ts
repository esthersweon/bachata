import type { DanceEvent } from "@/app/types";
import { neon } from "@neondatabase/serverless";

export async function getEventsWithStatus(userId: string): Promise<{
  status: 200 | 503 | 500;
  events: DanceEvent[];
}> {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return { status: 503, events: [] };
  }

  try {
    const sql = neon(url);
    const rows = await sql`SELECT e.id, e.name, e.date, e.image, ue.rsvp
      FROM events e
      LEFT JOIN users_events ue
      ON e.id = ue.event_id AND ue.user_id = ${userId}
      ORDER BY e.date DESC`;
    return { status: 200, events: rows as DanceEvent[] };
  } catch {
    return { status: 500, events: [] };
  }
}

export async function getEvents(userId: string): Promise<DanceEvent[]> {
  const { events } = await getEventsWithStatus(userId ?? "");
  return events;
}
