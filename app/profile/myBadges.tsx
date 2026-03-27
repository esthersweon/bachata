const badges = [
  {
    name: "Attended 10 events",
    color: "green",
  },
  {
    name: "Practiced 100 moves",
    color: "blue",
  },
];

export default function MyBadges() {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {badges.map(({ name, color }) => (
          <li
            key={name}
            className="flex items-center size-20 rounded-full p-2"
            style={{ backgroundColor: color }}
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}
