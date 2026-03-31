"use client";

import {
  Field,
  Input,
  Label,
  Tab,
  TabGroup,
  TabList,
  Textarea,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Modal from "../ui/modal";
import { categoriesToIcons } from "./constants";
import { updateQuery } from "./helpers";
import { MovementCategory } from "./types";

export default function CategoryTabs({
  categories,
}: {
  categories: MovementCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "";

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const submitForm = (formData: FormData) => {
    const name = formData.get("name");
    const description = formData.get("description");

    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
    })
      .then((response: Response) => response.json())
      .then(({ ok }) => {
        if (ok) {
          router.refresh();
          setShowModal(false);
        } else setError("Failed to add category. Please try again.");
      })
      .catch((error: Error) =>
        setError(`Failed to add category: ${error.message}`),
      );
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <TabGroup
          tabIndex={categories.findIndex(({ id }) => id === categoryId) ?? 0}
        >
          <TabList className="flex flex-wrap gap-1 cursor-pointer">
            {[{ id: "", name: "All" }, ...categories].map(({ id, name }) => {
              const Icon =
                categoriesToIcons[name as keyof typeof categoriesToIcons] ??
                null;

              return (
                <Tab
                  key={id}
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_DOMAIN}/glossary${updateQuery({ searchParams, name: "category", value: id })}`,
                    )
                  }
                  className={`${categoryId === (id ?? "") ? "font-bold bg-blue-900!" : "bg-gray-900!"} rounded-full! flex items-center gap-2`}
                >
                  {Icon && <Icon className="size-4" />}
                  <div>{name}</div>
                </Tab>
              );
            })}

            <button
              className="flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <PlusIcon className="size-4" /> Add Category
            </button>
          </TabList>
        </TabGroup>
      </div>

      {showModal && (
        <Modal
          title="Add Category"
          icon={<PlusIcon className="size-4" />}
          onClose={() => setShowModal(false)}
        >
          <form className="flex flex-col space-y-2" action={submitForm}>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Frames"
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows={3}
                className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                id="description"
                name="description"
                placeholder="e.g. Connecting with your partner"
              />
            </Field>
            <div className="self-end">
              <button type="submit">Add Category</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
