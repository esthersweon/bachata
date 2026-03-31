import { Suspense } from "react";
import AddMovementModal from "./addMovementModal";
import CategoryTabs from "./categoryTabs";
import LevelsMenu from "./levelsMenu";
import ListsMenu from "./listsMenu";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";
import { MovementCategory, MovementLevel } from "./types";

export const dynamic = "force-dynamic";

export default async function Glossary({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    level: string;
    category: string;
    list: string;
  }>;
}) {
  const { q = "", level = "", category = "", list = "" } = await searchParams;

  const {
    categories,
    levels,
  }: { categories: MovementCategory[]; levels: MovementLevel[] } = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters`)
  ).json();

  const lists = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
  ).json();

  return (
    <main>
      <div className="space-y-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h1>Glossary</h1>
          <AddMovementModal categories={categories} levels={levels} />
        </div>

        <p>Search for a movement to get started! 💃</p>

        <Suspense
          fallback={
            <div className="text-gray-300 h-20 flex items-center justify-center">
              Loading results...
            </div>
          }
        >
          <CategoryTabs categories={categories} />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1">
                <SearchInput />
              </div>
              <ListsMenu lists={lists} />
              <LevelsMenu levels={levels} />
            </div>

            <SearchResults
              q={q}
              level={level}
              category={category}
              list={list}
            />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
