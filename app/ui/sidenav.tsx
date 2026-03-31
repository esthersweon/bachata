"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import { bottomNavigation, topNavigation } from "@/app/ui/navigation";

export default function Sidenav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <div className="w-40 h-full bg-gray-800 flex flex-col justify-between pt-8">
      <button
        className="p-1! bg-gray-600! absolute top-2 left-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDoubleLeftIcon className="size-4" />
      </button>
      <ul className="flex flex-col gap-4 p-4">
        {topNavigation.map(({ name, href, icon: Icon }) => (
          <li key={name} className="flex items-center gap-2">
            <Icon className="size-4" />
            <Link href={href}>
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-4 p-4">
        {bottomNavigation.map(({ name, href, icon: Icon }) => (
          <li key={name} className="flex items-center gap-2">
            <Icon className="size-4" />
            <Link href={href}>
              <span>{name}</span>
            </Link>
          </li>
        ))}
        <li>{children}</li>
      </ul>
    </div>
  ) : (
    <button
      className="p-1! bg-gray-600! absolute top-2 left-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      <ChevronDoubleRightIcon className="size-4" />
    </button>
  );
}
