"use client";

import { StarIcon } from "@heroicons/react/24/outline";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Movement } from "../movements/types";
import { DanceEvent, List } from "../types";

export default function MyBadges({ userId }: { userId?: string }) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [events, setEvents] = useState<DanceEvent[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/movements${userId ? `?userId=${userId}` : ""}`,
      ).then((r) => r.json() as Promise<{ movements: Movement[] }>),
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/lists${userId ? `?userId=${userId}` : ""}`,
      ).then((r) => r.json() as Promise<{ lists: List[] }>),
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/events${userId ? `?userId=${userId}` : ""}`,
      ).then((r) => r.json() as Promise<{ events: DanceEvent[] }>),
    ]).then(([movementsResponse, listsResponse, eventsResponse]) => {
      setMovements(movementsResponse.movements);
      setLists(listsResponse.lists);
      setEvents(eventsResponse.events);
    });
  }, []);

  const eventsAttended = useMemo(
    () =>
      (events ?? []).filter(
        ({ date, rsvp }) => new Date() >= new Date(date) && !!rsvp,
      ).length,
    [events],
  );

  const movementsMastered = useMemo(
    () =>
      (movements ?? []).filter(({ statusName }) => statusName === "Mastered")
        .length,
    [movements],
  );

  const listsCompleted = useMemo(
    () =>
      (lists ?? []).filter(({ movements: listMovements = [] }) =>
        listMovements.every(({ checked }) => checked),
      ).length,
    [lists],
  );

  return (
    <Suspense fallback={<div>Loading badges...</div>}>
      <ul className="flex flex-wrap gap-2 justify-center text-xs text-center">
        {eventsAttended > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "green" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase font-bold">
              Attended {eventsAttended} event{eventsAttended === 1 ? "" : "s"}
            </div>
          </li>
        )}
        {movementsMastered > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "blueviolet" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase font-bold">
              Mastered {movementsMastered} moves
            </div>
          </li>
        )}
        {(lists ?? []).length > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "orange" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase font-bold">
              Created {lists.length} lists{" "}
              {listsCompleted > 0 && `(${listsCompleted} completed)`}
            </div>
          </li>
        )}
      </ul>
    </Suspense>
  );
}
