"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import CategoryTabs from "./categoryTabs";
import SearchFilter from "./searchFilter";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<{ level: string }>({
    level: "all",
  });
  const [selectedMovementId, setSelectedMovementId] = useState<number | null>(
    null,
  );

  return (
    <main>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h1>Glossary</h1>
          <Link href="/glossary/new">
            <button className="text-xs flex items-center gap-1">
              <PlusIcon className="size-4" />
              <div>Add Movement</div>
            </button>
          </Link>
        </div>

        <p>Search for a movement to get started! 💃</p>

        <div>
          <CategoryTabs
            tabIndex={tabIndex}
            setTabIndex={(index) => {
              setTabIndex(index);
              setSelectedMovementId(null);
            }}
          />
          <div className="p-2 border-2 border-gray-800 flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1">
                <SearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
              <div>
                <SearchFilter filter={filter} setFilter={setFilter} />
              </div>
            </div>
            <SearchResults
              selectedMovementId={selectedMovementId}
              setSelectedMovementId={setSelectedMovementId}
              filter={filter}
              searchTerm={searchTerm}
              setTabIndex={setTabIndex}
              tabIndex={tabIndex}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
