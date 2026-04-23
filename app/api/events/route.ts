import { getEventsWithStatus } from "@/app/lib/events";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const handle = request.nextUrl.searchParams.get("handle");
  const { status, events } = await getEventsWithStatus(handle ?? undefined);
  return Response.json(events, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
