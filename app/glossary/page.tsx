import { Suspense } from "react";
import AddMovementModal from "./addMovementModal";
import CategoryTabs from "./categoryTabs";
import LevelsMenu from "./levelsMenu";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";
import StatusesMenu from "./statusesMenu";
import { MovementCategory, MovementLevel } from "./types";

export const dynamic = "force-dynamic";

export default async function Glossary({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    level: string;
    category: string;
    status: string;
  }>;
}) {
  const { q = "", level = "", category = "", status = "" } = await searchParams;

  const {
    categories,
    levels,
  }: { categories: MovementCategory[]; levels: MovementLevel[] } = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters`)
  ).json();

  const statuses = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses`)
  ).json();

  return (
    <main>
      <div className="space-y-2">
        <h1>Glossary</h1>

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
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex-1">
                <SearchInput />
              </div>

              <StatusesMenu statuses={statuses} />
              <LevelsMenu levels={levels} />
              <AddMovementModal categories={categories} levels={levels} />
            </div>

            <SearchResults
              q={q}
              level={level}
              category={category}
              status={status}
            />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
