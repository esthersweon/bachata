"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ComponentProps } from "react";
import { categoriesToIcons } from "./constants";

export function formatMenuLabel(
  all: { id: string; name: string }[],
  selectedIds: string[],
  emptyLabel: string = "Categories",
) {
  if (selectedIds.length === 0) {
    return emptyLabel;
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {selectedIds.map((id) => {
        const selectedName = all.find((c) => c.id === id)?.name ?? "";
        const Icon = categoriesToIcons[selectedName] ?? null;
        return (
          <div key={id} className="flex items-center gap-1">
            {Icon ? <Icon className="size-4 shrink-0" /> : null}
            {selectedName}
          </div>
        );
      })}
    </div>
  );
}

export type CategoryMultiSelectClassNames = {
  button: string;
  items: string;
  item: string;
  itemUnselected: string;
  itemSelected: string;
};

const defaultClassNames: CategoryMultiSelectClassNames = {
  button: "flex items-center gap-1 bg-tertiary-bg!",
  items: "z-10 border border-tertiary-bg bg-secondary-bg rounded-lg",
  item: "flex w-full items-center gap-1.5 cursor-pointer px-2 py-1.5 text-left rounded-none!",
  itemUnselected: "bg-secondary-bg! hover:bg-tertiary-bg!",
  itemSelected: "font-bold! bg-selected! hover:bg-selected!",
};

type CategoryMultiSelectMenuProps = {
  categories: { id: string; name: string }[];
  selectedIds: string[];
  onChange: (next: string[]) => void;
  emptyLabel?: string;
  anchor?: "bottom end" | "bottom start";
  menuTransition?: boolean;
  /** When set, the label is wrapped in `<span className={...}>`. */
  labelClassName?: string;
  classNames?: Partial<CategoryMultiSelectClassNames>;
  buttonClassName?: string;
} & Omit<ComponentProps<typeof MenuButton>, "className" | "children">;

export function CategoryMultiSelectMenu({
  categories,
  selectedIds,
  onChange,
  emptyLabel = "Categories",
  anchor = "bottom end",
  menuTransition = true,
  labelClassName,
  classNames: classNamesOverride,
  buttonClassName,
  ...menuButtonProps
}: CategoryMultiSelectMenuProps) {
  const c = { ...defaultClassNames, ...classNamesOverride };
  const label = formatMenuLabel(categories, selectedIds, emptyLabel);

  return (
    <Menu>
      <MenuButton
        {...menuButtonProps}
        className={[c.button, buttonClassName].filter(Boolean).join(" ")}
      >
        {labelClassName != null ? (
          <span className={labelClassName}>{label}</span>
        ) : (
          label
        )}{" "}
        <ChevronDownIcon className="size-4 shrink-0" />
      </MenuButton>
      <MenuItems
        transition={menuTransition}
        anchor={anchor}
        className={c.items}
      >
        {categories.map(({ id, name }) => {
          const selected = selectedIds.includes(id);
          const CategoryIcon = categoriesToIcons[name] ?? null;
          return (
            <MenuItem
              key={id}
              as="button"
              type="button"
              className={[c.item, selected ? c.itemSelected : c.itemUnselected]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => {
                e.preventDefault();
                const next = selected
                  ? selectedIds.filter((cid) => cid !== id)
                  : [...selectedIds, id];
                onChange(next);
              }}
            >
              {CategoryIcon ? (
                <CategoryIcon className="size-4 shrink-0" />
              ) : null}
              {name}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
