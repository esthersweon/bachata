import type { DanceEvent } from "@/app/types";
import { neon } from "@neondatabase/serverless";

export async function getEventsWithStatus(): Promise<{
  status: 200 | 503 | 500;
  events: DanceEvent[];
}> {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return { status: 503, events: [] };
  }

  try {
    const sql = neon(url);
    const userId = "efbefbcd-e551-4e5c-9433-846d4b3a703f"; // TODO: Get user id from session
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

export async function getEvents(): Promise<DanceEvent[]> {
  const { events } = await getEventsWithStatus();
  return events;
}
