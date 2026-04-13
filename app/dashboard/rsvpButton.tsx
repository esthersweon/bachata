"use client";

import { MenuItem } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { updateRSVP } from "../lib/actions";

export default function RSVPButton({
  eventId,
  label,
  rsvp,
}: {
  eventId: string;
  label: string;
  rsvp: boolean | null;
}) {
  const router = useRouter();

  async function handleRSVP() {
    await updateRSVP(eventId, label === "Attending");
    router.refresh();
  }

  return (
    <MenuItem
      key={label}
      as="button"
      type="button"
      className={`text-nowrap cursor-pointer p-2! rounded-none! ${(label === "Attending" && !!rsvp) || (label === "Not Attending" && rsvp === false) ? "bg-tertiary-bg!" : "bg-secondary-bg!"} hover:bg-tertiary-bg!`}
      onClick={handleRSVP}
    >
      {label}
    </MenuItem>
  );
}
