"use client";

import type { DanceEvent } from "@/app/types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";
import { formatDate } from "../helpers";
import { rsvpToLabel } from "../lib/rsvpToLabel";
import RsvpStatusMenu from "./rsvpStatusMenu";

function EventRow({
  id,
  name,
  image,
  date,
  rsvp,
  allowEditing,
}: DanceEvent & { allowEditing?: boolean }) {
  const key = (rsvp ?? "null") as keyof typeof rsvpToLabel;
  const { icon, color: backgroundColor } = rsvpToLabel[key];
  return (
    <li className="bg-primary-bg p-4 rounded-lg flex items-center gap-2">
      <img src={image} alt={name} className="size-10 object-cover" />
      <div className="flex-1 flex flex-col">
        <div className="relative flex items-center gap-2 justify-between">
          <div className="font-bold">{name}</div>
          {allowEditing ? (
            <RsvpStatusMenu eventId={id} rsvp={rsvp} />
          ) : (
            <div
              className="p-1 rounded-full size-4 flex items-center justify-center cursor-default"
              style={{ backgroundColor }}
              aria-hidden
            >
              {icon}
            </div>
          )}
        </div>
        <div className="text-primary-text/75">{formatDate(date)}</div>
      </div>
    </li>
  );
}

function CollapsibleEventsList({
  title,
  count,
  listId,
  isOpen,
  onToggle,
  eventRows,
  allowEditing,
}: {
  title: string;
  count: number;
  listId: string;
  isOpen: boolean;
  onToggle: () => void;
  eventRows: DanceEvent[];
  allowEditing?: boolean;
}) {
  const buttonId = useId();
  return (
    <div className="flex flex-col gap-2">
      <button
        id={buttonId}
        type="button"
        className="w-full flex items-center justify-between gap-2 text-left text-sm uppercase font-bold bg-secondary-bg! rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={listId}
      >
        <span className="flex min-w-0 items-center gap-2">
          {title}
          <span
            className="inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-tertiary-bg px-1.5 text-xs font-bold tabular-nums"
            aria-hidden
          >
            {count}
          </span>
        </span>
        <ChevronDownIcon
          className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <ul id={listId} className="flex flex-col gap-2" role="list">
          {eventRows.map((ev) => (
            <EventRow key={ev.id} {...ev} allowEditing={allowEditing} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProfileEventsSection({
  events = [],
  allowEditing,
}: {
  events?: DanceEvent[];
  allowEditing?: boolean;
}) {
  const upcomingListId = useId();
  const pastListId = useId();
  const [upcomingOpen, setUpcomingOpen] = useState(true);
  const [pastOpen, setPastOpen] = useState(false);

  const now = new Date();
  const upcoming = events.filter(({ date }) => new Date(date) >= now);
  const past = events.filter(({ date }) => new Date(date) < now);

  return (
    <section className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/3*100%-0.5rem)] max-w-full">
      <CollapsibleEventsList
        title="Upcoming events"
        count={upcoming.length}
        listId={upcomingListId}
        isOpen={upcomingOpen}
        onToggle={() => setUpcomingOpen((o) => !o)}
        eventRows={upcoming}
        allowEditing={allowEditing}
      />
      <CollapsibleEventsList
        title="Past events"
        count={past.length}
        listId={pastListId}
        isOpen={pastOpen}
        onToggle={() => setPastOpen((o) => !o)}
        eventRows={past}
        allowEditing={allowEditing}
      />
    </section>
  );
}
