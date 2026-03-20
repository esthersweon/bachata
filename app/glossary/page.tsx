"use client";

import Link from "next/link";
import { useState } from "react";
import SearchFilter from "./searchFilter";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  return (
    <>
      <main>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1>Glossary</h1>
            <Link href="/glossary/new">
              <button>Add Item</button>
            </Link>
          </div>

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
          <SearchResults filter={filter} searchTerm={searchTerm} />
        </div>
      </main>
    </>
  );
}
