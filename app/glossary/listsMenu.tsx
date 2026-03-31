"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { List } from "../types";
import { updateQuery } from "./helpers";

export default function ListsMenu({ lists }: { lists: List[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams.get("list") ?? "";

  return (
    <Menu>
      <MenuButton
        className={`flex items-center gap-1 ${listId ? "font-bold bg-blue-900!" : "bg-gray-900!"}`}
      >
        List:{" "}
        {
          [{ id: "", name: "All" }, ...lists].find(({ id }) => id === listId)
            ?.name
        }{" "}
        <ChevronDownIcon className="size-4" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-10 border border-gray-700 bg-gray-800 rounded-lg"
      >
        {[{ id: "", name: "All" }, ...lists].map(({ id, name }) => (
          <MenuItem
            key={id}
            as="button"
            type="button"
            className="block w-full cursor-pointer p-2 bg-gray-800! text-left"
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_DOMAIN}/glossary${updateQuery({
                  searchParams,
                  name: "list",
                  value: listId === id ? "" : id,
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
