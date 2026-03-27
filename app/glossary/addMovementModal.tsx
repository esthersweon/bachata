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
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../ui/modal";
import { MovementCategory, MovementLevel } from "./types";

export default function AddMovementModal({
  categories,
  levels,
}: {
  categories: MovementCategory[];
  levels: MovementLevel[];
}) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [levelId, setLevelId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatMissingFieldsError = (missingFields: string[]) => {
    if (missingFields.length === 1) {
      return missingFields[0];
    } else if (missingFields.length === 2) {
      return `${missingFields[0]} and ${missingFields[1]}`;
    } else {
      return (
        missingFields.slice(0, -1).join(", ") +
        ", and " +
        missingFields[missingFields.length - 1]
      );
    }
  };

  const submitForm = (formData: FormData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const levelId = formData.get("levelId");
    const categoryId = formData.get("categoryId");

    if (!name || !description || !levelId || !categoryId) {
      const missingFields = [
        { name: "Name", value: name },
        { name: "Description", value: description },
        { name: "Level", value: levelId },
        { name: "Category", value: categoryId },
      ]
        .filter(({ value }) => !value)
        .map(({ name }) => `"${name}"`);

      setError(
        `Please fill in the ${formatMissingFieldsError(missingFields)} field${missingFields.length > 1 ? "s" : ""}.`,
      );

      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
      method: "POST",
      body: JSON.stringify({ name, description, levelId, categoryId }),
    })
      .then((response: Response) => response.json())
      .then(({ ok }) => {
        if (ok) {
          router.refresh();
          setShowModal(false);
        } else {
          setError("Failed to add movement. Please try again.");
        }
      })
      .catch((error: Error) =>
        setError(`Failed to add movement: ${error.message}`),
      );
  };

  return (
    <>
      <button
        className="flex items-center gap-1"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="size-4" />
        <div>Add Movement</div>
      </button>
      {showModal && (
        <Modal
          title="Add Movement"
          icon={<PlusIcon className="size-4" />}
          onClose={() => setShowModal(false)}
        >
          <form className="flex flex-col gap-4" action={submitForm}>
            <Field className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Basic Step"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows={3}
                className="block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                id="description"
                name="description"
                placeholder="e.g. The foundation of bachata"
              />
            </Field>

            <input type="hidden" name="levelId" value={levelId} />
            <input type="hidden" name="categoryId" value={categoryId} />

            <div className="flex gap-2">
              <Menu>
                <MenuButton className="flex items-center gap-1 bg-gray-800!">
                  {levels.find(({ id }) => id === levelId)?.name ?? "Level"}{" "}
                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-10 border border-gray-700 bg-gray-800 rounded-lg"
                >
                  {levels.map(({ id, name }) => (
                    <MenuItem
                      key={id}
                      as="button"
                      type="button"
                      className="block w-full cursor-pointer p-2 bg-gray-800! text-left"
                      onClick={() => setLevelId(id)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <Menu>
                <MenuButton className="flex items-center gap-1 bg-gray-800!">
                  {categories.find(({ id }) => id === categoryId)?.name ??
                    "Category"}{" "}
                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-10 border border-gray-700 bg-gray-800 rounded-lg"
                >
                  {categories.map(({ id, name }) => (
                    <MenuItem
                      key={id}
                      as="button"
                      type="button"
                      className="block w-full cursor-pointer p-2 bg-gray-800! text-left"
                      onClick={() => setCategoryId(id)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            <p className="text-xs text-red-500">{error}</p>

            <div className="self-end">
              <button type="submit">Add Movement</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
