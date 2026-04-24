import { getEventsWithStatus } from "@/app/lib/events";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const userId = request.nextUrl.searchParams.get("userId");
  const { status, events } = await getEventsWithStatus(userId ?? "");
  return Response.json(events, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
