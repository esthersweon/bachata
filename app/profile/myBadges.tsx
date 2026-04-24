"use client";

import { StarIcon } from "@heroicons/react/24/outline";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Movement } from "../movements/types";
import { DanceEvent, List } from "../types";

export default function MyBadges({ userId }: { userId: string }) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [events, setEvents] = useState<DanceEvent[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/movements?userId=${userId}`,
      ).then((r) => r.json() as Promise<{ movements: Movement[] }>),
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/lists?userId=${userId}`,
      ).then((r) => r.json() as Promise<List[]>),
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/events?userId=${userId}`,
      ).then((r) => r.json() as Promise<DanceEvent[]>),
    ]).then(([movementsResponse, listsResponse, eventsResponse]) => {
      setMovements(movementsResponse.movements);
      setLists(listsResponse);
      setEvents(eventsResponse);
    });
  }, [userId]);

  const eventsAttended = useMemo(
    () =>
      (events ?? []).filter(
        ({ date, rsvp }) => new Date() >= new Date(date) && !!rsvp,
      ),
    [events],
  );

  const movementsMastered = useMemo(
    () =>
      (movements ?? []).filter(({ statusName }) => statusName === "Mastered"),
    [movements],
  );

  const listsCompleted = useMemo(
    () =>
      (lists ?? []).filter(({ movements: listMovements = [] }) =>
        listMovements.every(({ checked }) => checked),
      ),
    [lists],
  );

  return (
    <Suspense fallback={<div>Loading badges...</div>}>
      <ul className="flex flex-wrap gap-2 justify-center text-xs text-center">
        {eventsAttended.length > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "green" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase">
              Attended {eventsAttended.length} event
              {eventsAttended.length === 1 ? "" : "s"}
            </div>
          </li>
        )}
        {movementsMastered.length > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "blueviolet" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase">
              Mastered {movementsMastered.length} moves
            </div>
          </li>
        )}
        {(lists ?? []).length > 0 && (
          <li
            className="flex gap-2 items-center rounded-full p-2 px-4"
            style={{ backgroundColor: "orangered" }}
          >
            <StarIcon className="size-4" />
            <div className="uppercase">
              Created {lists.length} list{lists.length === 1 ? "" : "s"}{" "}
              {listsCompleted.length > 0 &&
                `(${listsCompleted.length} completed)`}
            </div>
          </li>
        )}
      </ul>
    </Suspense>
  );
}
