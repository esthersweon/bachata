import { Suspense } from "react";
import AddMovementModal from "./addMovementModal";
import CategoryTabs from "./categoryTabs";
import FiltersMenu from "./filtersMenu";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";
import { MovementCategory, MovementLevel } from "./types";

export const dynamic = "force-dynamic";

export default async function Glossary({
  searchParams,
}: {
  searchParams: Promise<{ q: string; level: string; category: string }>;
}) {
  const { q = "", level = "", category = "" } = await searchParams;

  const {
    categories,
    levels,
  }: { categories: MovementCategory[]; levels: MovementLevel[] } = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters`)
  ).json();

  return (
    <main>
      <div className="space-y-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h1>Glossary</h1>
          <AddMovementModal categories={categories} levels={levels} />
        </div>

        <p>Search for a movement to get started! 💃</p>

        <CategoryTabs categories={categories} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1">
              <SearchInput />
            </div>
            <FiltersMenu levels={levels} />
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
