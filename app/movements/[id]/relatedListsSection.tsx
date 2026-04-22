"use client";

import List from "@/app/profile/list";
import type { List as ListType } from "@/app/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type RelatedListsSectionProps = {
  movementId: string;
  lists: ListType[];
};

export function RelatedListsSection({
  movementId,
  lists,
}: RelatedListsSectionProps) {
  const filteredLists = useMemo(
    () =>
      (lists ?? []).filter(({ movements }) =>
        movements.some(
          ({ id: movementInListId }) => movementInListId === movementId,
        ),
      ),
    [lists, movementId],
  );

  return (
    <section className="flex flex-col gap-2">
      <div className="text-primary-text/75">
        {filteredLists.length > 0
          ? `This movement appears in the following ${filteredLists.length} lists:`
          : "This movement does not appear in any lists."}
      </div>

      <ul className="flex flex-col gap-2">
        {filteredLists.length > 0 &&
          filteredLists.map(({ id, name, movements }) => (
            <List key={id} id={id} name={name} movements={movements} />
          ))}
      </ul>

      <Menu>
        <MenuButton className="flex justify-center items-center gap-1">
          <PlusIcon className="size-4" />
          <div>Add to List</div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="flex flex-col z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none"
        >
          {lists.map(({ id, name }) => {
            const alreadyContainsMovement = filteredLists.some(
              ({ id: filteredListId }) => filteredListId === id,
            );
            return (
              <MenuItem
                key={id}
                as="button"
                type="button"
                className={`rounded-none! p-2 bg-secondary-bg! hover:bg-tertiary-bg! text-left ${
                  alreadyContainsMovement
                    ? "opacity-50 cursor-not-allowed!"
                    : ""
                }`}
                disabled={alreadyContainsMovement}
              >
                {name}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </section>
  );
}
