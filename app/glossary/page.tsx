import { Suspense } from "react";
import AddToGlossaryModal from "./addToGlossaryModal";
import CategoryTabs from "./categoryTabs";
import FiltersModal from "./filtersModal";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

export default async function Glossary({
  searchParams,
}: {
  searchParams: Promise<{ q: string; level: string; category: string }>;
}) {
  const { q = "", level = "", category = "" } = await searchParams;

  return (
    <main>
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h1>Glossary</h1>
          <AddToGlossaryModal />
        </div>

        <p>Search for a movement to get started! 💃</p>

        <CategoryTabs />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1">
              <SearchInput />
            </div>
            <div>
              <FiltersModal />
            </div>
          </div>

          <Suspense
            fallback={
              <div className="text-gray-300 h-20 flex items-center justify-center">
                Loading results...
              </div>
            }
          >
            <SearchResults q={q} level={level} category={category} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
