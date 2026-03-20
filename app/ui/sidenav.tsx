import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
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
  return (
    <div className="w-40 h-full bg-gray-800 p-4 flex flex-col">
      <ul className="flex flex-col gap-4">
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
