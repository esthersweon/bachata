"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { Status } from "../types";
import { updateQuery } from "./helpers";

export default function StasusesMenu({ statuses }: { statuses: Status[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusId = searchParams.get("status") ?? "";

  return (
    <Menu>
      <MenuButton
        className={`flex items-center gap-1 ${statusId ? "font-bold bg-selected!" : "bg-secondary-bg!"}`}
      >
        <span className="hidden md:block">Status: </span>
        {
          [{ id: "", name: "All" }, ...statuses].find(
            ({ id }) => id === statusId,
          )?.name
        }{" "}
        <ChevronDownIcon className="size-4" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-10 border border-tertiary-bg bg-secondary-bg rounded-lg"
      >
        {[{ id: "", name: "All" }, ...statuses].map(({ id, name }) => (
          <MenuItem
            key={id}
            as="button"
            type="button"
            className="block w-full cursor-pointer p-2 bg-secondary-bg! hover:bg-tertiary-bg! text-left"
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_DOMAIN}/glossary${updateQuery({
                  searchParams,
                  name: "status",
                  value: statusId === id ? "" : id,
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
