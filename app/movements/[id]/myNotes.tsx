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
    <div className="flex-2 p-4 flex flex-col gap-2 bg-tertiary-bg rounded-lg m-4">
      <div className="text-center uppercase font-bold">My Notes</div>

      <Textarea
        className="w-full resize-none rounded-lg border-none bg-tertiary-bg p-2"
        defaultValue={notes}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
        onBlur={(e) => {
          if (e.target.value.trim() !== notes) console.log("hi"); // updateNotes();
        }}
      />
    </div>
  );
}
