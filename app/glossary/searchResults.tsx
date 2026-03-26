import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Checkbox from "../ui/checkbox";
import { categoriesToIcons } from "./constants";
import DeleteMovementButton from "./deleteMovementButton";
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
      {movements.map(({ id, name, description, category, levelColor }) => {
        const Icon = categoriesToIcons[category] ?? null;
        return (
          <li
            key={id}
            className="flex-1 grow-0 bg-gray-800 py-2 px-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] max-w-full group"
          >
            <div className="flex gap-4 items-center">
              <Checkbox />
              <div className="w-full flex justify-between items-center gap-4 cursor-pointer">
                <div>
                  <h4 className="text-nowrap">{name}</h4>
                  <p className="text-xs font-light">{description}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <PlusCircleIcon className="size-4 hidden group-hover:block" />
                  <DeleteMovementButton id={id} name={name} />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: levelColor ?? "none" }}
                  />

                  <button className="text-xs bg-gray-700! flex items-center gap-2">
                    {Icon && <Icon className="size-4" />}
                  </button>
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
