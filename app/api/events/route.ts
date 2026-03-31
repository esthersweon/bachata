import { getEventsWithMeta } from "@/app/lib/events";

export async function GET(): Promise<Response> {
  const { status, events } = await getEventsWithMeta();
  return Response.json(events, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
