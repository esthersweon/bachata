"use client";

import { Textarea } from "@headlessui/react";
import { useState } from "react";

export default function MyNotes({
  notes: initialNotes = "",
}: {
  notes: string;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const updateNotes = async (nextNotes: string) => {};

  return (
    <Textarea
      rows={5}
      className="w-full resize-none rounded-lg border-none bg-tertiary-bg p-2"
      defaultValue={notes}
      onChange={(e) => {
        setNotes(e.target.value);
      }}
      onBlur={(e) => {
        if (e.target.value.trim() !== notes) console.log("hi"); // updateNotes();
      }}
    />
  );
}
