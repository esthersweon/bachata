"use client";

import { useState } from "react";
import CategoryTabs from "./categoryTabs";
import MovementDetails from "./movementDetails";
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
        <h1>Glossary</h1>

        <div>
          <CategoryTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
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
            <div className="flex gap-4">
              <div className="flex-1">
                <SearchResults
                  selectedMovementId={selectedMovementId}
                  setSelectedMovementId={setSelectedMovementId}
                  filter={filter}
                  searchTerm={searchTerm}
                  tabIndex={tabIndex}
                />
              </div>
              <div className="flex-2 bg-gray-800 p-2 rounded-lg flex flex-col gap-2">
                <button className="text-xs self-end">Add Movement</button>
                {selectedMovementId && (
                  <MovementDetails movementId={selectedMovementId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
