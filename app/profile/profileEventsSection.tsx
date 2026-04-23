"use client";

import type { DanceEvent } from "@/app/types";
import { formatDate } from "../helpers";
import RsvpStatusMenu from "./rsvpStatusMenu";

function EventRow({ id, name, image, date, rsvp }: DanceEvent) {
  return (
    <li className="bg-primary-bg p-4 rounded-lg flex items-center gap-2">
      <img
        src={image}
        alt={name}
        className="size-10 object-cover"
      />
      <div className="flex-1 flex flex-col">
        <div className="relative flex items-center gap-2 justify-between">
          <div className="font-bold">{name}</div>
          <RsvpStatusMenu eventId={id} rsvp={rsvp} />
        </div>
        <div className="text-primary-text/75">{formatDate(date)}</div>
      </div>
    </li>
  );
}

export default function ProfileEventsSection({
  events,
}: {
  events: DanceEvent[];
}) {
  const now = new Date();
  const upcoming = events.filter(({ date }) => new Date(date) >= now);
  const past = events.filter(({ date }) => new Date(date) < now);

  return (
    <section className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/3*100%-0.5rem)] max-w-full">
      <div className="text-sm uppercase font-bold">Upcoming events</div>
      <ul className="flex flex-col gap-2">
        {upcoming.map((ev) => (
          <EventRow key={ev.id} {...ev} />
        ))}
      </ul>
      <div className="uppercase font-bold text-sm">Past events</div>
      <ul className="flex flex-col gap-2">
        {past.map((ev) => (
          <EventRow key={ev.id} {...ev} />
        ))}
      </ul>
    </section>
  );
}
