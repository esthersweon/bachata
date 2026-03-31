"use client";

import { Field, Input, Label } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Movement } from "../glossary/types";
import Checkbox from "../ui/checkbox";
import Modal from "../ui/modal";

export default function AddListModal() {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [movements, setMovements] = useState<Movement[]>([]);
  const [selectedMovementIds, setSelectedMovementIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const createList = async () => {
    if (!listName.trim()) {
      setError("Please enter a name for the list");
      return;
    }
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`, {
        method: "POST",
        body: JSON.stringify({ name: listName.trim() }),
      })
    ).json();

    const listMovementsResponse = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "POST",
        body: JSON.stringify({
          listIds: [response.id],
          movementIds: selectedMovementIds,
        }),
      })
    ).json();

    setError(response?.error ?? listMovementsResponse?.error ?? null);

    if (response.ok && listMovementsResponse.ok) {
      setShowModal(false);
      router.refresh();
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`)
      .then((response) => response.json())
      .then((data) => setMovements(data));
  }, []);

  return (
    <>
      <button
        className="flex items-center gap-1"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="size-4" />
        <div>Add List</div>
      </button>
      {showModal && (
        <Modal title="Add List" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <Label htmlFor="listName">Name</Label>
              <Input
                type="text"
                placeholder="e.g. My Favorite Moves"
                onChange={(e) => setListName(e.target.value)}
              />
            </Field>
            <div className="flex flex-col gap-2">
              <div>Movements</div>
              <div className="flex flex-col gap-2 border border-tertiary-text rounded-xl p-2">
                <div className="flex items-center gap-2 self-end">
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      setSelectedMovementIds(movements.map(({ id }) => id))
                    }
                  >
                    Select All
                  </div>
                  <div
                    className="cursor-pointer underline"
                    onClick={() => setSelectedMovementIds([])}
                  >
                    Deselect All
                  </div>
                </div>
                <ul className="max-h-75 overflow-y-scroll">
                  {movements.map((movement) => (
                    <li
                      key={movement.id}
                      className="flex items-center gap-2 p-1"
                    >
                      <Checkbox
                        key={movement.id}
                        checked={selectedMovementIds.includes(movement.id)}
                        setChecked={() => {
                          if (selectedMovementIds.includes(movement.id)) {
                            setSelectedMovementIds(
                              selectedMovementIds.filter(
                                (id) => id !== movement.id,
                              ),
                            );
                          } else {
                            setSelectedMovementIds((prev) => [
                              ...prev,
                              movement.id,
                            ]);
                          }
                        }}
                      />
                      {movement.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button
              className="bg-info text-primary-text p-2 rounded-md"
              onClick={createList}
            >
              Add List
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
