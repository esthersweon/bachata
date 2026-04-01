import { StarIcon } from "@heroicons/react/24/outline";
import { getEvents } from "../lib/events";
import { Movement } from "../movements/types";

export default async function MyBadges() {
  const events = await getEvents();
  const eventsAttended = events.filter(
    ({ date, rsvp }) => new Date(date) >= new Date() && !!rsvp,
  ).length;

  const movements = (await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`)
  ).json()) as Movement[];
  const movementsMastered = movements.filter(
    ({ statusName }) => statusName === "Mastered",
  ).length;

  return (
    <ul className="flex flex-wrap gap-2 justify-center text-xs text-center">
      {eventsAttended > 0 && (
        <li
          className="flex gap-2 items-center rounded-full p-2 px-4"
          style={{ backgroundColor: "green" }}
        >
          <StarIcon className="size-4" />
          <div>
            Attended {eventsAttended} event{eventsAttended === 1 ? "" : "s"}
          </div>
        </li>
      )}
      <li
        className="flex gap-2 items-center rounded-full p-2 px-4"
        style={{ backgroundColor: "blueviolet" }}
      >
        <StarIcon className="size-4" />
        <div>Mastered {movementsMastered} moves</div>
      </li>
    </ul>
  );
}
