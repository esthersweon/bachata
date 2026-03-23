"use client";

import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryFilters, categoryIcons } from "../mockData";
import { updateQuery } from "./helpers";

export default function CategoryTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  return (
    <TabGroup
      tabIndex={categoryFilters.findIndex(({ id }) => id === category) ?? 0}
    >
      <TabList className="flex flex-wrap gap-1 cursor-pointer">
        {categoryFilters.map(({ id, name }) => {
          const Icon =
            categoryIcons[name as keyof typeof categoryIcons] ?? null;

          return (
            <Tab
              key={id}
              onClick={() =>
                router.push(
                  `http://localhost:3000/glossary${updateQuery({ searchParams, name: "category", value: id })}`,
                )
              }
              className={`${category === (id ?? "") ? "font-bold bg-blue-900!" : "bg-gray-900!"} rounded-full! flex items-center gap-2`}
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
