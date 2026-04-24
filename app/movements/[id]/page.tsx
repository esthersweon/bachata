"use client";

import type { List as ListType, Status } from "@/app/types";
import Modal from "@/app/ui/modal";
import { Button, Textarea } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Movement, MovementLevel } from "../types";
import MyNotes from "./myNotes";
import PageHeader from "./pageHeader";
import PageWrapper from "./pageWrapper";
import { RelatedListsSection } from "./relatedListsSection";
import VideosCarousel from "./videosCarousel";

export const dynamic = "force-dynamic";

export default function MovementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = useSession();
  const userId = session?.data?.user?.id ?? "";

  const [movement, setMovement] = useState<Movement | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [lists, setLists] = useState<ListType[]>([]);
  const [filterLevels, setFilterLevels] = useState<MovementLevel[]>([]);
  const [filterCategories, setFilterCategories] = useState<
    { id: string; name: string }[]
  >([]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);
  const router = useRouter();

  const updateMovement = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, ...movement, userId }),
      })
    ).json();
    setError(response?.error ?? null);
  };

  const updateLevel = async (newLevelId: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, levelId: newLevelId, userId }),
      })
    ).json();
    if (response.ok) {
      const lvl = filterLevels.find((l) => l.id === newLevelId);
      if (lvl) {
        setMovement((prev) =>
          prev
            ? {
                ...prev,
                levelId: newLevelId,
                level: lvl.name,
                levelColor: lvl.color,
              }
            : null,
        );
      }
      router.refresh();
    }
    setError(response?.error ?? null);
  };

  const updateCategories = async (newCategoryIds: string[]) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, categoryIds: newCategoryIds, userId }),
      })
    ).json();
    if (response.ok) {
      const names = newCategoryIds
        .map((cid) => filterCategories.find((c) => c.id === cid)?.name)
        .filter((n): n is string => Boolean(n));
      if (names.length > 0) {
        setMovement((prev) =>
          prev
            ? {
                ...prev,
                categoryIds: newCategoryIds,
                categories: names,
              }
            : null,
        );
      }
      router.refresh();
    }
    setError(response?.error ?? null);
  };

  const deleteMovement = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements/${id}`, {
        method: "DELETE",
      })
    ).json();
    setError(response?.error ?? null);
    if (response.ok) {
      router.refresh();
      setShowDeleteConfirmation(false);
    }
  };

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_DOMAIN;
    void Promise.all([
      fetch(`${base}/api/movements/${id}?userId=${userId}`).then((r) =>
        r.json(),
      ),
      fetch(`${base}/api/filters`).then((r) => r.json()),
      fetch(`${base}/api/statuses`).then((r) => r.json()),
      fetch(`${base}/api/lists`).then((r) => r.json()),
    ]).then(([movementData, filtersData, statusesData, listsData]) => {
      setMovement(movementData);

      setFilterLevels(filtersData?.levels ?? []);
      setFilterCategories(filtersData?.categories ?? []);
      setStatuses(statusesData);
      setLists(listsData);
    });
  }, [id]);

  if (!movement) {
    return (
      <PageWrapper>
        <div className="bg-secondary-bg rounded-lg p-8 text-center text-gray-300">
          Movement not found.
        </div>
      </PageWrapper>
    );
  }

  const currentFilterLevel = filterLevels.find(
    (l) => l.id === movement.levelId,
  );

  return (
    <PageWrapper>
      <article className="bg-secondary-bg rounded-lg p-4 flex flex-col gap-4">
        <PageHeader
          movement={movement}
          filterLevels={filterLevels}
          filterCategories={filterCategories}
          currentFilterLevel={currentFilterLevel}
          statuses={statuses}
          onUpdateMovement={updateMovement}
          onLevelChange={updateLevel}
          onCategoryChange={updateCategories}
          onStatusIdChange={(newStatusId) =>
            setMovement((prev) => ({
              ...(prev as Movement),
              statusId: newStatusId,
            }))
          }
        />

        <section className="flex gap-4">
          <VideosCarousel />
          <div className="flex-1 flex flex-col gap-2">
            <div className="uppercase font-bold">Description</div>

            <Textarea
              rows={5}
              className="w-full resize-none rounded-lg border-none bg-tertiary-bg p-2"
              defaultValue={movement.description}
              onChange={(e) =>
                setMovement((prev) => ({
                  ...(prev as Movement),
                  description: e.target.value,
                }))
              }
              onBlur={updateMovement}
            />

            <div className="uppercase font-bold">How to Cue</div>

            <Textarea
              rows={5}
              className="w-full resize-none rounded-lg border-none bg-tertiary-bg p-2"
              defaultValue={movement.prep}
              onChange={({ target: { value } }) =>
                setMovement((prev) => ({ ...(prev as Movement), prep: value }))
              }
              onBlur={updateMovement}
            />

            <div className="uppercase font-bold">When to use</div>

            <Textarea
              rows={5}
              className="w-full resize-none rounded-lg border-none bg-tertiary-bg p-2"
              defaultValue={movement.usage}
              onChange={({ target: { value } }) =>
                setMovement((prev) => ({ ...(prev as Movement), usage: value }))
              }
              onBlur={updateMovement}
            />
          </div>
        </section>

        <hr className="border-tertiary-bg" />

        <section className="flex gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-center uppercase font-bold">My Notes</div>
              <MyNotes notes={movement.notes} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-center uppercase font-bold">
                My Related Lists
              </div>
              <RelatedListsSection movementId={id} lists={lists} />
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="text-center uppercase font-bold">My Progress</div>
            <VideosCarousel />
          </div>
        </section>

        <hr className="border-tertiary-bg" />

        <Button
          className="bg-danger! justify-center flex items-center gap-2"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <TrashIcon className="size-4 " />
          Delete Movement
        </Button>
      </article>
      {showDeleteConfirmation && (
        <Modal
          onClose={() => setShowDeleteConfirmation(false)}
          icon={<TrashIcon className="size-4" />}
          className="flex flex-col gap-2"
        >
          <p>Are you sure you want to delete &quot;{movement.name}&quot;?</p>
          <Button className="bg-danger!" onClick={deleteMovement}>
            Delete
          </Button>
          {error && <p className="text-danger">{error}</p>}
        </Modal>
      )}
    </PageWrapper>
  );
}
