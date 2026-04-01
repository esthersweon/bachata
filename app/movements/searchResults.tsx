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
    <ul className="flex flex-wrap gap-2">
      {movements.map((movement) => {
        const Icon = categoriesToIcons[movement.category] ?? null;
        return (
          <li
            key={movement.id}
            className="flex-1 md:grow-0 bg-secondary-bg p-2 pl-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] min-w-50 max-w-full"
          >
            <div
              className={`flex flex-wrap justify-between items-center gap-2 cursor-pointer ${movement.statusName === "Mastered" ? "text-primary-text/40" : "text-primary-text"}`}
            >
              <div>
                <h4 className="text-nowrap">{movement.name}</h4>
                <p className="text-xs font-light">{movement.description}</p>
              </div>
              <div className="flex flex-1 justify-end gap-2 items-center">
                <div className="text-xs text-nowrap bg-tertiary-bg! px-2 py-1 rounded-full hidden md:block">
                  {movement.statusName}
                </div>

                <div
                  title={`${movement.category} (${movement.level})`}
                  className="text-xs flex items-center p-1.5 rounded-full"
                  style={{ backgroundColor: movement.levelColor }}
                >
                  {Icon && <Icon className="size-4" />}
                </div>
                <MovementMenu {...movement} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
