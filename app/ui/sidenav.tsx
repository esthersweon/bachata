import Link from "next/link";

const navigation: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Glossary",
    href: "/glossary",
  },
  {
    name: "My Lists",
    href: "/myLists",
  },
  { name: "Inbox", href: "/inbox" },
  { name: "Settings", href: "/settings" },
];

export default function Sidenav() {
  return (
    <div className="w-64 h-full bg-gray-800 p-4 flex flex-col">
      <ul>
        {navigation.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
