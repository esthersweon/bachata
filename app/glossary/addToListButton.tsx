"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Checkbox from "../ui/checkbox";
import Modal from "../ui/modal";

export default function AddToListButton({
  movementId,
}: {
  movementId: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
      .then((response: Response) => response.json())
      .then(
        (data: { id: string; name: string; movements: { id: string }[] }[]) => {
          setLists(data);
          setSelectedListIds(
            data
              .filter(({ movements }) =>
                movements.some(({ id }) => id === movementId),
              )
              .map(({ id }) => id),
          );
        },
      );
  }, []);

  const addMovementToList = async (listId: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "POST",
        body: JSON.stringify({ movementId, listIds: [listId] }),
      })
    ).json();
    setError(response?.error ?? null);
  };

  const removeMovementFromList = async (listId: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "DELETE",
        body: JSON.stringify({ movementId, listIds: [listId] }),
      })
    ).json();
    setError(response?.error ?? null);
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
              {lists.map(({ id: listId, name }) => (
                <li
                  key={listId}
                  className="flex gap-2 items-center p-4 rounded-lg hover:bg-gray-700! cursor-pointer"
                  onClick={() => {
                    if (selectedListIds.includes(listId)) {
                      setSelectedListIds(
                        selectedListIds.filter((id) => id !== listId),
                      );
                      removeMovementFromList(listId);
                    } else {
                      setSelectedListIds([...selectedListIds, listId]);
                      addMovementToList(listId);
                    }
                  }}
                >
                  <Checkbox checked={selectedListIds.includes(listId)} />
                  {name}
                </li>
              ))}
            </ul>

            {error && <p className="text-red-500">{error}</p>}
          </div>
        </Modal>
      )}
    </>
  );
}
