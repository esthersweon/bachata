import { categoriesToIcons } from "./constants";
import MovementMenu from "./movementMenu";
import type { Movement } from "./types";

export const dynamic = "force-dynamic";

async function SearchResults({
  q,
  level,
  category,
  status,
}: {
  q: string;
  level: string;
  category: string;
  status: string;
}) {
  const movements: Movement[] = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/movements?q=${q}&level=${level}&category=${category}&status=${status}`,
    )
  ).json();

  return movements.length === 0 ? (
    <div className="text-gray-300 h-20 flex items-center justify-center">
      No results found. Please adjust your search criteria.
    </div>
  ) : (
    <ul className="flex flex-wrap gap-2 space-y-1">
      {movements.map((movement) => {
        const Icon = categoriesToIcons[movement.category] ?? null;
        return (
          <li
            key={movement.id}
            className="flex-1 grow-0 bg-gray-800 p-2 pl-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] max-w-full group"
          >
            <div className="flex gap-4 items-center">
              <div className="w-full flex justify-between items-center gap-4 cursor-pointer">
                <div>
                  <h4 className="text-nowrap">{movement.name}</h4>
                  <p className="text-xs font-light">{movement.description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: movement.levelColor ?? "none" }}
                  />

                  <button className="text-xs bg-gray-700! flex items-center">
                    {Icon && <Icon className="size-4" />}
                  </button>

                  <MovementMenu {...movement} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
