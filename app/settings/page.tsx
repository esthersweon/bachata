"use client";

import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Checkbox from "../ui/checkbox";

export default function Settings() {
  const [enabled, setEnabled] = useState<boolean>(true);
  return (
    <main>
      <div className="flex flex-col gap-2">
        <h1>Settings</h1>
        <h2>Notifications</h2>
        <div className="flex items-center gap-2">
          <Checkbox checked={true} setChecked={() => {}} />
          <span>Enable notifications</span>
        </div>
        <h2>Privacy</h2>
        <div className="flex items-center gap-2">
          <Checkbox checked={true} setChecked={() => {}} />
          <span>Enable privacy</span>
        </div>
        <h2>Display Mode</h2>
        <Switch
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className={`${enabled ? "bg-selected!" : "bg-yellow-200!"} relative inline-flex h-9.5 w-18.5 shrink-0 cursor-pointer rounded-full! p-1! border-2 border-transparent transition-colors duration-200 ease-in-out`}
        >
          <span className="sr-only">Use setting</span>
          {enabled ? (
            <MoonIcon className="size-7.5 absolute left-1.5" />
          ) : (
            <SunIcon className="size-7.5 absolute right-1.5" />
          )}
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-9 bg-gray-300" : "translate-x-0 bg-tertiary-bg"} pointer-events-none inline-block h-7.5 w-7.5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </main>
  );
}
