"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Movement } from "../movements/types";
import Checkbox from "../ui/checkbox";
import Modal from "../ui/modal";

export default function EditListModal({
  id,
  name,
  selectedMovementIds: initialSelectedMovementIds,
  onClose,
}: {
  id: string;
  name: string;
  selectedMovementIds: string[];
  onClose: () => void;
}) {
  const router = useRouter();

  const [listName, setListName] = useState(name);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [selectedMovementIds, setSelectedMovementIds] = useState<string[]>(
    initialSelectedMovementIds,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`)
      .then((response) => response.json())
      .then((data) => setMovements(data));
  }, []);

  const editList = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`, {
        method: "PATCH",
        body: JSON.stringify({
          id,
          name: listName,
          movementIds: selectedMovementIds,
        }),
      })
    ).json();
    if (response.ok) {
      onClose();
      router.refresh();
    }
    setError(response?.error || null);
  };

  return (
    <Modal title="Edit List" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Field className="flex flex-col gap-2">
          <Label htmlFor="listName">Name</Label>
          <Input
            type="text"
            placeholder="e.g. My Favorite Moves"
            defaultValue={name}
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
                <li key={movement.id} className="flex items-center gap-2 p-1">
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
        <Button onClick={editList}>Update List</Button>
      </div>
    </Modal>
  );
}
