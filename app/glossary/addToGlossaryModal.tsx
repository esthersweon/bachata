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
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { categoryFilters, levelFilters } from "../mockData";
import Modal from "../ui/modal";

export default function AddToGlossaryModal() {
  return (
    <Modal title="Add Movement" triggerNode={<div>Add Movement</div>}>
      <div className="flex flex-col space-y-4">
        <form className="space-y-2">
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
              <MenuItems transition anchor="bottom end">
                {levelFilters.slice(1).map(({ id, name }) => (
                  <MenuItem key={id}>{name}</MenuItem>
                ))}
              </MenuItems>
            </Menu>
            <Menu>
              <MenuButton className="flex items-center gap-1 bg-gray-800!">
                Category <ChevronDownIcon className="size-4" />
              </MenuButton>
              <MenuItems>
                {categoryFilters.slice(1).map(({ id, name }) => (
                  <MenuItem key={id}>{name}</MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </form>
      </div>
    </Modal>
  );
}
