import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const topNavigation: {
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

export const bottomNavigation: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Logout", href: "/logout", icon: ArrowLeftStartOnRectangleIcon },
];
