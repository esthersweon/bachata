"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQuery } from "./helpers";
import { MovementLevel } from "./types";

export default function FiltersMenu({ levels }: { levels: MovementLevel[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelId = searchParams.get("level") ?? "";

  return (
    <Menu>
      <MenuButton
        className="flex items-center gap-1"
        style={{
          backgroundColor: levels.find(({ id }) => id === levelId)?.color ?? "",
        }}
      >
        {
          [{ id: "", name: "All Levels" }, ...levels].find(
            ({ id }) => id === levelId,
          )?.name
        }{" "}
        <ChevronDownIcon className="size-4" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-10 border border-gray-700 bg-gray-800 rounded-lg"
      >
        {[{ id: "", name: "All Levels" }, ...levels].map(({ id, name }) => (
          <MenuItem
            key={id}
            as="button"
            type="button"
            className="block w-full cursor-pointer p-2 bg-gray-800! text-left"
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
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
