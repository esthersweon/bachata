"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryFilters, levelFilters } from "../mockData";
import Modal from "../ui/modal";
import { updateQuery } from "./helpers";

export default function FiltersModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const level = searchParams.get("level") ?? "";
  const category = searchParams.get("category") ?? "";

  return (
    <Modal
      title="Filters"
      triggerNode={
        <button>
          <FunnelIcon aria-hidden="true" className="size-6 text-white" />
        </button>
      }
      className="flex flex-col gap-2"
      icon={<FunnelIcon className="size-4" />}
    >
      <h3>Levels</h3>
      <div className="flex gap-2">
        {levelFilters.map(({ color, id, abbreviation }) => (
          <button
            key={id}
            className="text-xs"
            style={{
              backgroundColor: color,
              border: level === id ? "2px solid white" : "none",
            }}
            onClick={() =>
              router.push(
                `http://localhost:3000/glossary${updateQuery({
                  searchParams,
                  name: "level",
                  value: id,
                })}`,
              )
            }
          >
            {abbreviation}
          </button>
        ))}
      </div>
      <h3>Categories</h3>
      <div className="flex gap-2">
        {categoryFilters.map(({ id, name }) => (
          <button
            key={id}
            className="text-xs bg-gray-700!"
            style={{
              border: category === id ? "2px solid white" : "none",
            }}
            onClick={() =>
              router.push(
                `http://localhost:3000/glossary${updateQuery({
                  searchParams,
                  name: "category",
                  value: id,
                })}`,
              )
            }
          >
            {name}
          </button>
        ))}
      </div>
    </Modal>
  );
}
