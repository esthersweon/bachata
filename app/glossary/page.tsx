import { Suspense } from "react";
import AddToGlossaryModal from "./addToGlossaryModal";
import CategoryTabs from "./categoryTabs";
import FiltersModal from "./filtersModal";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";

export const dynamic = "force-dynamic";

export default async function Glossary({
  searchParams,
}: {
  searchParams: Promise<{ q: string; level: string; category: string }>;
}) {
  const { q = "", level = "", category = "" } = await searchParams;

  const { categories, levels } = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/glossary/filters`)
  ).json();

  return (
    <main>
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h1>Glossary</h1>
          <AddToGlossaryModal categories={categories} levels={levels} />
        </div>

        <p>Search for a movement to get started! 💃</p>

        <CategoryTabs categories={categories} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1">
              <SearchInput />
            </div>
            <div>
              <FiltersModal categories={categories} levels={levels} />
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
