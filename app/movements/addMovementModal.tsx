"use client";

import {
  Button,
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
import { CategoryMultiSelectMenu } from "./categoryMultiSelectMenu";
import { MovementCategory, MovementLevel } from "./types";

const formatMissingFields = (fields: string[]): string => {
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} and ${fields[1]}`;
  return fields.slice(0, -1).join(", ") + ", and " + fields[fields.length - 1];
};

export default function AddMovementModal({
  categories,
  levels,
}: {
  categories: MovementCategory[];
  levels: MovementLevel[];
}) {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [levelId, setLevelId] = useState<string | null>(null);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: FormData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const levelId = formData.get("levelId");
    const missingFieldNames = [
      { name: "Name", value: name },
      { name: "Description", value: description },
      { name: "Level", value: levelId },
      { name: "Category", value: categoryIds.length > 0 },
    ]
      .filter(({ value }) => !value)
      .map(({ name }) => `"${name}"`);

    if (missingFieldNames.length > 0) {
      setError(
        `Please fill in the ${formatMissingFields(missingFieldNames)} field${missingFieldNames.length > 1 ? "s" : ""}.`,
      );
      return;
    }

    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "POST",
        body: JSON.stringify({ name, description, levelId, categoryIds }),
      })
    ).json();

    if (response.ok) {
      router.refresh();
      setShowModal(false);
      setCategoryIds([]);
    }

    setError(
      response.error ? `Failed to add movement: ${response.error}` : null,
    );
  };

  return (
    <>
      <Button
        className="flex items-center gap-1 rounded-full!"
        onClick={() => {
          setShowModal(true);
          setError(null);
          setCategoryIds([]);
        }}
        title="Add Movement"
      >
        <PlusIcon className="size-4" />
      </Button>
      {showModal && (
        <Modal
          title="Add Movement"
          icon={<PlusIcon className="size-4" />}
          onClose={() => {
            setShowModal(false);
            setCategoryIds([]);
            setError(null);
          }}
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
                className="block w-full resize-none rounded-lg border-none bg-primary-text/5 px-3 py-1.5 text-sm/6 text-primary-text focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-primary-text/25"
                id="description"
                name="description"
                placeholder="e.g. The foundation of bachata"
              />
            </Field>

            <input type="hidden" name="levelId" value={levelId ?? ""} />

            <div className="flex gap-2">
              <Menu>
                <MenuButton className="flex items-center gap-1 bg-tertiary-bg!">
                  {levels.find(({ id }) => id === levelId)?.name ?? "Level"}{" "}
                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-10 border border-tertiary-bg! bg-secondary-bg! rounded-lg"
                >
                  {levels.map(({ id, name, color }) => (
                    <MenuItem
                      key={id}
                      as="button"
                      type="button"
                      className="flex items-center gap-2 w-full cursor-pointer p-2 bg-secondary-bg! hover:bg-tertiary-bg! text-left"
                      onClick={() => setLevelId(id)}
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
              <CategoryMultiSelectMenu
                categories={categories}
                selectedIds={categoryIds}
                onChange={setCategoryIds}
                emptyLabel="Categories"
                anchor="bottom end"
                menuTransition
              />
            </div>

            <p className="text-xs text-danger">{error}</p>

            <Button type="submit">Add Movement</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
