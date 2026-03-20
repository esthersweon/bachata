import { levelFilters } from "../mockData";

export default function SearchFilter({
  filter,
  setFilter,
}: {
  filter: { level: string };
  setFilter: (filter: { level: string }) => void;
}) {
  return (
    <div className="flex gap-2">
      {levelFilters.map(({ color, id, abbreviation }) => (
        <button
          key={id}
          className="text-xs"
          style={{
            backgroundColor: color,
            border: filter.level === id ? "2px solid white" : "none",
          }}
          onClick={() => setFilter({ level: id })}
        >
          {abbreviation}
        </button>
      ))}
    </div>
  );
}
