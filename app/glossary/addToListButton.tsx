"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Modal from "../ui/modal";

export default function AddToListButton({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
      .then((response: Response) => response.json())
      .then((data) => setLists(data));
  }, []);

  const addMovementToLists = async ({
    id,
    listIds,
  }: {
    id: string;
    listIds: string[];
  }) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "POST",
        body: JSON.stringify({ movementId: id, listIds }),
      })
    ).json();
    if (response.error) {
      setError(response.error);
    } else {
      setError(null);
      setShowModal(false);
    }
  };

  return (
    <>
      <PlusCircleIcon
        className="size-4 hidden group-hover:block"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal
          title="Add to Lists"
          icon={<PlusCircleIcon className="size-4" />}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2">
              {lists.map(({ id, name }) => (
                <li
                  key={id}
                  className={`p-4 rounded-lg hover:bg-gray-700! cursor-pointer ${selectedListIds.includes(id) ? "outline outline-white" : ""}`}
                  onClick={() => {
                    if (selectedListIds.includes(id)) {
                      setSelectedListIds(
                        selectedListIds.filter((listId) => listId !== id),
                      );
                    } else {
                      setSelectedListIds([...selectedListIds, id]);
                    }
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="self-end">
              <button
                onClick={() =>
                  addMovementToLists({ id, listIds: selectedListIds })
                }
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
