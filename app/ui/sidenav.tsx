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
];

export default function Sidenav() {
  return (
    <div className="w-64 h-full bg-gray-900 p-4 flex flex-col">
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
