"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const navigation: {
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
  {
    name: "Glossary",
    href: "/glossary",
    icon: BookOpenIcon,
  },
  { name: "Inbox", href: "/inbox", icon: InboxIcon },
  { name: "Logout", href: "/logout", icon: ArrowLeftStartOnRectangleIcon },
];

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div className="w-40 h-full bg-gray-800 flex">
      <ul className="flex flex-col gap-4 p-4">
        {navigation.map(({ name, href, icon: Icon }) => (
          <li key={name} className="flex items-center gap-2">
            <Icon className="size-4" />
            <Link href={href}>
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button className="rounded-none! p-1!" onClick={() => setIsOpen(!isOpen)}>
        <ChevronDoubleLeftIcon className="size-4" />{" "}
      </button>
    </div>
  ) : (
    <button className="rounded-none! p-1!" onClick={() => setIsOpen(!isOpen)}>
      <ChevronDoubleRightIcon className="size-4" />
    </button>
  );
}
