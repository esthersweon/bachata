"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const topNavigation: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Inbox", href: "/inbox", icon: InboxIcon },
  {
    name: "Glossary",
    href: "/glossary",
    icon: BookOpenIcon,
  },
];

const bottomNavigation: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Logout", href: "/logout", icon: ArrowLeftStartOnRectangleIcon },
];

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <div className="flex justify-between w-40 h-full bg-gray-800">
      <div className="flex flex-col justify-between h-full">
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
        </ul>
      </div>
      <button
        className="rounded-none! p-1! bg-gray-600!"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDoubleLeftIcon className="size-4" />
      </button>
    </div>
  ) : (
    <button
      className="rounded-none! p-1! bg-gray-600!"
      onClick={() => setIsOpen(!isOpen)}
    >
      <ChevronDoubleRightIcon className="size-4" />
    </button>
  );
}
