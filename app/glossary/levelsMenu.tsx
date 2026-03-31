"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQuery } from "./helpers";
import { MovementLevel } from "./types";

export default function LevelsMenu({ levels }: { levels: MovementLevel[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelId = searchParams.get("level") ?? "";

  const listOfLevels = [{ id: "", name: "All", color: "" }, ...levels];
  const currentLevel = listOfLevels.find(({ id }) => id === levelId);

  return (
    <Menu>
      <MenuButton
        className={`flex items-center gap-1 ${levelId ? "font-bold" : "bg-gray-900!"}`}
        style={{
          backgroundColor: (currentLevel as MovementLevel)?.color ?? "",
        }}
      >
        <span className="hidden md:block">Level: </span>
        {currentLevel?.name} <ChevronDownIcon className="size-4" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-10 bg-gray-800 rounded-lg"
      >
        {listOfLevels.map(({ id, name, color }) => (
          <MenuItem
            key={id}
            as="button"
            type="button"
            className="flex gap-2 items-center w-full cursor-pointer p-2 bg-gray-800! hover:bg-gray-700! text-left"
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
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <div>{name}</div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
