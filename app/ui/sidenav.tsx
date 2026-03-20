import {
  BookOpenIcon,
  CogIcon,
  HomeIcon,
  InboxIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

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
  {
    name: "Glossary",
    href: "/glossary",
    icon: BookOpenIcon,
  },
  {
    name: "My Lists",
    href: "/myLists",
    icon: ListBulletIcon,
  },
  { name: "Inbox", href: "/inbox", icon: InboxIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export default function Sidenav() {
  return (
    <div className="w-64 h-full bg-gray-800 p-4 flex flex-col">
      <ul>
        {navigation.map(({ name, href, icon: Icon }) => (
          <li key={name} className="flex items-center gap-2">
            <Icon className="size-4" />
            <Link href={href}>
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
