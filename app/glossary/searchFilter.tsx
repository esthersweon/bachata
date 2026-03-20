import { glossaryCategories } from "../mockData";

export default function SearchFilter({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {glossaryCategories.map(({ color, id, name }) => (
        <button
          key={id}
          className="text-xs"
          style={{
            backgroundColor: color,
            border: filter === id ? `2px solid white` : "none",
          }}
          onClick={() => setFilter(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
