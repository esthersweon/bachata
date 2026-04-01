import { StarIcon } from "@heroicons/react/24/outline";

const badges = [
  { name: "Attended 1 event", color: "darkgoldenrod" },
  { name: "Mastered 3 moves", color: "blueviolet" },
];

export default function MyBadges() {
  return (
    <ul className="flex flex-wrap gap-2 justify-center text-xs text-center">
      {badges.map(({ name, color }) => (
        <li
          key={name}
          className="flex gap-2 items-center rounded-full p-2 px-4"
          style={{ backgroundColor: color }}
        >
          <StarIcon className="size-4" />
          <div>{name}</div>
        </li>
      ))}
    </ul>
  );
}
