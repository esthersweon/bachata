"use client";

import { MenuItem } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateRSVP } from "../lib/actions";

const labelToRSVP: Record<string, boolean | null> = {
  Attending: true,
  "Not Attending": false,
  Undecided: null,
};

export default function RSVPButton({
  eventId,
  label,
  rsvp,
}: {
  eventId: string;
  label: string;
  rsvp: boolean | null;
}) {
  const userId = useSession()?.data?.user?.id ?? "";

  const router = useRouter();
  const isSelected = rsvp === labelToRSVP[label];

  return (
    <MenuItem
      key={label}
      as="button"
      type="button"
      className={`text-nowrap cursor-pointer p-2! rounded-none! ${isSelected ? "bg-tertiary-bg!" : "bg-secondary-bg!"} hover:bg-tertiary-bg!`}
      onClick={async () => {
        await updateRSVP({
          eventId,
          rsvp: labelToRSVP[label] as boolean | null,
          userId,
        });
        router.refresh();
      }}
    >
      {label}
    </MenuItem>
  );
}
