import {
  BookOpenIcon,
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export const topNavigation: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  // { name: "Profile", href: "/profile", icon: UserIcon },
  // { name: "Inbox", href: "/inbox", icon: InboxIcon },
  { name: "Movements", href: "/movements", icon: BookOpenIcon },
  { name: "Combos", href: "/combos", icon: PlusIcon },
];

export const bottomNavigation: {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [{ name: "Settings", href: "/settings", icon: Cog6ToothIcon }];
