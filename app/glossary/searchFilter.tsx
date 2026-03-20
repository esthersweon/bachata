import { glossaryCategories } from "../mockData";

export default function SearchFilter({
  filter,
  setFilter,
}: {
  filter: { level: string };
  setFilter: (filter: { level: string }) => void;
}) {
  return (
    <div className="flex gap-2">
      {glossaryCategories.map(({ color, id, name }) => (
        <button
          key={id}
          className="text-xs"
          style={{
            backgroundColor: color,
            border: filter.level === id ? "2px solid white" : "none",
          }}
          onClick={() => setFilter({ level: id })}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
