import Link from "next/link";
import { Status } from "../types";
import { categoriesToIcons } from "./constants";
import MovementMenu from "./movementMenu";
import type { Movement } from "./types";

export const dynamic = "force-dynamic";

export default async function SearchResults({
  q,
  level,
  category,
  status,
  statuses,
}: {
  q: string;
  level: string;
  category: string;
  status: string;
  statuses: Status[];
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
        return (
          <Link
            className="flex-1 md:grow-0 bg-secondary-bg p-2 pl-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] min-w-50 max-w-full"
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/movements/${movement.id}`}
            key={movement.id}
          >
            <li>
              <div
                className={`flex flex-wrap justify-between items-center gap-3 cursor-pointer ${movement.statusName === "Mastered" ? "text-primary-text/40" : "text-primary-text"}`}
              >
                <div
                  title={`${movement.category} (${movement.level})`}
                  className="text-xs flex items-center p-1.5 rounded-full"
                  style={{ backgroundColor: movement.levelColor }}
                >
                  {Icon && <Icon className="size-4" />}
                </div>
                <div>
                  <h4 className="text-nowrap flex items-center gap-2">
                    <span>{movement.name}</span>
                  </h4>
                  <div className="text-xs font-light max-w-50 text-ellipsis text-nowrap overflow-hidden">
                    {movement.description}
                  </div>
                </div>
                <div className="flex flex-1 justify-end gap-2 items-center">
                  <div className="text-xs text-nowrap bg-tertiary-bg! px-2 py-1 rounded-full hidden md:block">
                    {movement.statusName}
                  </div>

                  <MovementMenu {...movement} statuses={statuses} />
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
