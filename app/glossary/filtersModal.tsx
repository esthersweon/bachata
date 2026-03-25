"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../ui/modal";
import { updateQuery } from "./helpers";
import { MovementCategory, MovementLevel } from "./types";

export default function FiltersModal({
  categories,
  levels,
}: {
  categories: MovementCategory[];
  levels: MovementLevel[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const levelId = searchParams.get("level") ?? "";
  const categoryId = searchParams.get("category") ?? "";

  const numFilters = [levelId, categoryId].filter(Boolean).length;

  return (
    <Modal
      title="Filters"
      triggerNode={
        <button className="flex">
          <FunnelIcon aria-hidden="true" className="size-6" />
          {numFilters > 0 && (
            <div className="text-xs rounded-full bg-red-500 w-4 h-4 -ml-2 -mt-1">
              {numFilters}
            </div>
          )}
        </button>
      }
      className="flex flex-col gap-4"
      icon={<FunnelIcon className="size-4" />}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {levels.map(({ color, id, name }) => (
            <button
              key={id}
              className="text-xs"
              style={{
                backgroundColor: color,
                border: levelId === id ? "2px solid white" : "none",
              }}
              onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_DOMAIN}/glossary${updateQuery({
                    searchParams,
                    name: "level",
                    value: levelId === id ? "" : id,
                  })}`,
                )
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
