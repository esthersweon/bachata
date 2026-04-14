import type { Status } from "@/app/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { categoriesToIcons } from "../constants";
import MovementMenu from "../movementMenu";
import type { Movement } from "../types";

export const dynamic = "force-dynamic";

function isMovement(data: unknown): data is Movement {
  return (
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data) &&
    "id" in data &&
    "name" in data &&
    typeof (data as Movement).name === "string"
  );
}

export default async function MovementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const base = process.env.NEXT_PUBLIC_DOMAIN ?? "";

  const [movementRes, statusesRes] = await Promise.all([
    fetch(`${base}/api/movements/${id}`),
    fetch(`${base}/api/statuses`),
  ]);

  const raw = await movementRes.json();
  const movement = isMovement(raw) ? raw : null;
  const statusesPayload = await statusesRes.json();
  const statuses: Status[] = Array.isArray(statusesPayload)
    ? statusesPayload
    : [];

  if (!movement) {
    return (
      <main className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <Link
          href="/movements"
          className="inline-flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-primary-text transition-colors w-fit"
        >
          <ArrowLeftIcon className="size-4 shrink-0" />
          Back to movements
        </Link>
        <div className="bg-secondary-bg rounded-lg p-8 text-center text-gray-300">
          Movement not found.
        </div>
      </main>
    );
  }

  const Icon = categoriesToIcons[movement.category] ?? null;
  const isMastered = movement.statusName === "Mastered";

  return (
    <main className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <Link
        href="/movements"
        className="inline-flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-primary-text transition-colors w-fit"
      >
        <ArrowLeftIcon className="size-4 shrink-0" />
        Back to movements
      </Link>

      <article
        className={`bg-secondary-bg rounded-lg p-4 flex flex-col gap-4 ${isMastered ? "text-primary-text/40" : "text-primary-text"}`}
      >
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="shrink-0 flex items-center justify-center p-2.5 rounded-full"
              style={{ backgroundColor: movement.levelColor }}
              title={`${movement.category} (${movement.level})`}
            >
              {Icon ? <Icon className="size-6" /> : null}
            </div>
            <div className="min-w-0 space-y-2">
              <h1 className="text-2xl font-bold wrap-break-word leading-tight">
                {movement.name}
              </h1>
              <div className="flex justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-tertiary-bg px-2 py-1 rounded-full">
                    {movement.level}
                  </span>
                  <span className="text-xs bg-tertiary-bg px-2 py-1 rounded-full">
                    {movement.category}
                  </span>
                </div>

                <div className="text-xs bg-tertiary-bg px-2 py-1 rounded-full">
                  {movement.statusName}
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <MovementMenu {...movement} statuses={statuses} />
          </div>
        </header>

        {movement.description ? (
          <section className="border-t border-tertiary-bg pt-4 space-y-2">
            <h2 className="text-sm font-bold opacity-90">Description</h2>
            <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">
              {movement.description}
            </p>
          </section>
        ) : null}
      </article>
    </main>
  );
}
