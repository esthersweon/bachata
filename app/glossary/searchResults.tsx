import { categoryIcons } from "../mockData";
import MovementDetails from "./movementDetails";
import type { Movement } from "./types";

export const dynamic = "force-dynamic";

async function SearchResults({
  q,
  level,
  category,
}: {
  q: string;
  level: string;
  category: string;
}) {
  const movements: Movement[] = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/glossary?q=${q}&level=${level}&category=${category}`,
    )
  ).json();

  return movements.length === 0 ? (
    <div className="text-gray-300 h-20 flex items-center justify-center">
      No results found. Please adjust your search criteria.
    </div>
  ) : (
    <ul className="flex flex-wrap gap-2 space-y-1">
      {movements.map(({ id, name, description, category }) => {
        const Icon = categoryIcons[category] ?? null;
        return (
          <li
            key={id}
            className="flex-1 bg-gray-800 py-2 px-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] max-w-full"
          >
            <div className="flex justify-between items-center gap-4">
              <h4 className="text-nowrap">{name}</h4>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full"></div>

                <button className="text-xs bg-gray-700! flex items-center gap-2">
                  {Icon && <Icon className="size-4" />}
                </button>

                <MovementDetails name={name} description={description} />
              </div>
            </div>
            <p className="text-xs font-light">{description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
