"use client";

import {
  Field,
  Input,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/modal";
import { MovementCategory, MovementLevel } from "./types";

export default function AddToGlossaryModal({
  categories,
  levels,
}: {
  categories: MovementCategory[];
  levels: MovementLevel[];
}) {
  const submitForm = (formData: FormData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const level = formData.get("level");
    const category = formData.get("category");
    console.info({ name, description, level, category });
  };

  return (
    <Modal
      title="Add Movement"
      icon={<PlusIcon className="size-4" />}
      triggerNode={
        <button className="flex items-center gap-1">
          <PlusIcon className="size-4" />
          <div>Add Movement</div>
        </button>
      }
    >
      <form className="flex flex-col space-y-4" action={submitForm}>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Basic Step"
          />
        </Field>
        <Field>
          <Label htmlFor="description">Description</Label>
          <Textarea
            rows={3}
            className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            id="description"
            name="description"
            placeholder="e.g. The foundation of bachata"
          />
        </Field>

        <div className="flex gap-2">
          <Menu>
            <MenuButton className="flex items-center gap-1 bg-gray-800!">
              Level <ChevronDownIcon className="size-4" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="z-10 border border-gray-700 rounded-lg"
            >
              {levels.slice(1).map(({ id, name }) => (
                <MenuItem
                  key={id}
                  as="div"
                  className="cursor-pointer p-2 bg-gray-800"
                >
                  {name}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Menu>
            <MenuButton className="flex items-center gap-1 bg-gray-800!">
              Category <ChevronDownIcon className="size-4" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="z-10 border border-gray-700 rounded-lg"
            >
              {categories.slice(1).map(({ id, name }) => (
                <MenuItem
                  key={id}
                  as="div"
                  className="cursor-pointer p-2 bg-gray-800"
                >
                  {name}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>

        <div className="self-end">
          <button type="submit">Add</button>
        </div>
      </form>
    </Modal>
  );
}
