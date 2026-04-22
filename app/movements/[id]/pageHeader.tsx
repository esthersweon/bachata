"use client";

import type { Status } from "@/app/types";
import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import type { MouseEvent } from "react";
import { CategoryMultiSelectMenu } from "../categoryMultiSelectMenu";
import { categoriesToIcons } from "../constants";
import { Movement, MovementLevel } from "../types";

export default function PageHeader({
  movement,
  details,
  filterLevels,
  filterCategories,
  currentFilterLevel,
  selectedStatusId,
  statuses,
  onUpdateMovement,
  onLevelChange,
  onCategoryChange,
  onStatusIdChange,
}: {
  movement: Movement;
  details: { name: string };
  filterLevels: MovementLevel[];
  filterCategories: { id: string; name: string }[];
  currentFilterLevel: MovementLevel | undefined;
  selectedStatusId: string | null;
  statuses: Status[];
  onUpdateMovement: (payload: {
    name?: string;
    statusId?: string;
  }) => void | Promise<void>;
  onLevelChange: (newLevelId: string) => void | Promise<void>;
  onCategoryChange: (newCategoryIds: string[]) => void | Promise<void>;
  onStatusIdChange: (id: string | null) => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-4 min-w-0">
        <div
          className="shrink-0 flex items-center justify-center p-2.5 rounded-full gap-0.5"
          style={{ backgroundColor: movement.levelColor }}
          title={`${movement.categories.join(", ")} (${movement.level})`}
        >
          {movement.categories.map((catName, i) => {
            const Icon = categoriesToIcons[catName] ?? null;
            return Icon ? (
              <Icon key={`${catName}-${i}`} className="size-6" />
            ) : null;
          })}
        </div>

        <div className="flex flex-col gap-2">
          <Input
            defaultValue={details.name}
            onChange={() => {}}
            onBlur={(e) => {
              if (e.target.value.trim() !== details.name)
                onUpdateMovement({ name: e.target.value.trim() });
            }}
            className="text-2xl font-bold rounded-lg border-none bg-secondary-bg px-3 py-1.5"
          />

          <div className="flex justify-between gap-2">
            <div className="flex flex-wrap gap-2 items-center">
              <Menu>
                <MenuButton
                  className="flex items-center gap-1"
                  style={{
                    backgroundColor:
                      currentFilterLevel?.color ?? movement.levelColor,
                  }}
                >
                  {currentFilterLevel?.name ?? movement.level}{" "}
                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-10 bg-secondary-bg rounded-lg"
                >
                  {filterLevels.map(
                    ({ id: levelOptionId, name: levelName, color }) => (
                      <MenuItem
                        key={levelOptionId}
                        as="button"
                        type="button"
                        className="flex gap-2 items-center w-full cursor-pointer p-2 bg-secondary-bg! hover:bg-tertiary-bg! text-left"
                        onClick={() => onLevelChange(levelOptionId)}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <div>{levelName}</div>
                      </MenuItem>
                    ),
                  )}
                </MenuItems>
              </Menu>

              <CategoryMultiSelectMenu
                categories={filterCategories}
                selectedIds={movement.categoryIds}
                onChange={(ids) => {
                  void onCategoryChange(ids);
                }}
                labelClassName=""
                emptyLabel="Categories"
                menuTransition={false}
                anchor="bottom start"
                classNames={{
                  items:
                    "z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none min-w-40",
                }}
                buttonClassName="inline-flex items-center gap-1 text-xs bg-tertiary-bg px-2 py-1 rounded-full cursor-pointer hover:bg-tertiary-bg/80"
                onClick={(e: MouseEvent) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>

      <Menu>
        <MenuButton
          className="flex items-center gap-1 bg-tertiary-bg! hover:text-gray-500!"
          onClick={(e) => e.preventDefault()}
        >
          {movement.statusName}
          <ChevronDownIcon className="size-4" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none"
        >
          <MenuItem>
            <RadioGroup
              value={selectedStatusId}
              onChange={(value) => {
                if (value !== selectedStatusId)
                  onUpdateMovement({ statusId: value ?? undefined });
                onStatusIdChange(value);
              }}
              className="border-b border-tertiary-bg"
            >
              {statuses.map(({ id, name: statusName }) => (
                <Radio
                  key={id}
                  value={id}
                  className="flex items-center cursor-pointer gap-2 p-2 py-1.5 hover:bg-tertiary-bg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {id === movement.statusId ? (
                    <CheckIcon className="size-3" />
                  ) : (
                    <div className="size-3" />
                  )}
                  <div>{statusName}</div>
                </Radio>
              ))}
            </RadioGroup>
          </MenuItem>
        </MenuItems>
      </Menu>
    </header>
  );
}
