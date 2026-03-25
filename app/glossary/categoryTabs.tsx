"use client";

import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
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

  return (
    <TabGroup
      tabIndex={categories.findIndex(({ id }) => id === categoryId) ?? 0}
    >
      <TabList className="flex flex-wrap gap-1 cursor-pointer">
        {categories.map(({ id, name }) => {
          const Icon =
            categoriesToIcons[name as keyof typeof categoriesToIcons] ?? null;

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
      </TabList>
    </TabGroup>
  );
}
