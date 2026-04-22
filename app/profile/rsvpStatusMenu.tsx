"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useLayoutEffect, useState } from "react";

import { rsvpToLabel } from "@/app/lib/rsvpToLabel";
import RSVPButton from "./rsvpButton";

const RSVP_OPTIONS = ["Attending", "Not Attending", "Undecided"] as const;

export default function RsvpStatusMenu({
  eventId,
  rsvp,
}: {
  eventId: string;
  rsvp: boolean | null;
}) {
  const [isMenuClient, setIsMenuClient] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsMenuClient(true);
  }, []);

  const key = (rsvp ?? "null") as keyof typeof rsvpToLabel;
  const { icon, color: backgroundColor } = rsvpToLabel[key];

  if (!isMenuClient) {
    return (
      <div
        className="p-1 rounded-full w-4 h-4 flex items-center justify-center cursor-default"
        style={{ backgroundColor }}
        aria-hidden
      >
        {icon}
      </div>
    );
  }

  return (
    <Menu>
      <div className="relative">
        <MenuButton
          as="div"
          className="p-1 rounded-full cursor-pointer hover:text-primary-text/50"
          style={{ backgroundColor }}
        >
          {icon}
        </MenuButton>
        <MenuItems className="flex flex-col absolute top-0 left-8 bg-secondary-bg! rounded-lg overflow-hidden border border-tertiary-bg outline-none z-10">
          {RSVP_OPTIONS.map((label) => (
            <RSVPButton
              key={label}
              eventId={eventId}
              label={label}
              rsvp={rsvp}
            />
          ))}
        </MenuItems>
      </div>
    </Menu>
  );
}
