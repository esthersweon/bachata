"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddToGlossaryModal from "./addToGlossaryModal";
import CategoryTabs from "./categoryTabs";
import SearchFilter from "./searchFilter";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

export default function Home() {
  const [controls, setControls] = useState({
    tabIndex: 0,
    searchTerm: "",
    filter: { level: "" },
  });
  const [selectedMovementId, setSelectedMovementId] = useState<number | null>(
    null,
  );

  return (
    <main>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h1>Glossary</h1>
          <button className="text-xs flex items-center gap-1">
            <PlusIcon className="size-4" />
            <AddToGlossaryModal />
          </button>
        </div>

        <p>Search for a movement to get started! 💃</p>

        <div>
          <CategoryTabs
            tabIndex={controls.tabIndex}
            setTabIndex={(index) => {
              setControls({ ...controls, tabIndex: index });
              setSelectedMovementId(null);
            }}
          />
          <div className="p-2 flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1">
                <SearchInput
                  searchTerm={controls.searchTerm}
                  setSearchTerm={(searchTerm) => {
                    setControls({ ...controls, searchTerm });
                    setSelectedMovementId(null);
                  }}
                />
              </div>
              <div>
                <SearchFilter
                  filter={controls.filter}
                  setFilter={(filter) => {
                    setControls({ ...controls, filter });
                    setSelectedMovementId(null);
                  }}
                />
              </div>
            </div>
            <SearchResults
              controls={controls}
              selectedMovementId={selectedMovementId}
              setSelectedMovementId={setSelectedMovementId}
              setTabIndex={(idx) => {
                setControls({ ...controls, tabIndex: idx });
                setSelectedMovementId(null);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
