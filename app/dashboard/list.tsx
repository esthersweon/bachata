"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListMovement } from "../movements/types";
import Checkbox from "../ui/checkbox";
import Modal from "../ui/modal";
import EditListModal from "./editListModal";

export default function List({
  id,
  name,
  movements,
}: {
  id: string;
  name: string;
  movements: ListMovement[];
}) {
  const [showMovements, setShowMovements] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const checkListMovement = async ({
    listId,
    movementId,
    checked,
  }: {
    listId: string;
    movementId: string;
    checked: boolean;
  }) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "PATCH",
        body: JSON.stringify({ movementId, listId, checked }),
      })
    ).json();

    if (response.ok) router.refresh(); // TODO: Update the list in the state instead of refreshing the page

    setError(response?.error ?? null);
  };

  const deleteList = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      })
    ).json();
    if (response.ok) {
      router.refresh();
      setShowDeleteConfirmation(false);
    }

    setError(response?.error ?? null);
  };

  return (
    <div key={id} className="flex flex-col rounded-lg overflow-hidden">
      <div
        key={id}
        className="flex items-center gap-2 py-2 px-4 justify-between cursor-pointer bg-primary-bg hover:bg-primary-bg/75"
        onClick={() => setShowMovements(!showMovements)}
      >
        <div className="flex flex-col">
          <h3 className="mb-0! text-nowrap">{name}</h3>
          <div className="text-xs text-primary-text/50">
            ({movements.length} movements)
          </div>
        </div>
        <Menu>
          <MenuButton
            className="bg-primary-bg! p-0! hover:text-primary-text/50!"
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisVerticalIcon className="size-4" />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none"
          >
            <MenuItem>
              <div
                className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
                onClick={() => setShowEditModal(true)}
              >
                <PencilIcon className="size-4" />
                <div>Edit</div>
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                <TrashIcon className="size-4" />
                <div>Delete</div>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <ul
        className={`flex flex-wrap gap-2 bg-primary-bg border-t border-tertiary-bg transition-all duration-300 ${showMovements ? "p-4 opacity-100" : "h-0 opacity-0"}`}
      >
        {movements.map(({ id: movementId, name, checked }) => (
          <li
            key={movementId}
            className={`flex basis-[calc(50%-0.25rem)] grow-0 items-center gap-2 ${checked ? "text-primary-text/50 line-through" : ""}`}
          >
            <Checkbox
              checked={checked}
              setChecked={() => {
                checkListMovement({
                  listId: id,
                  movementId,
                  checked: !checked,
                });
              }}
            />
            {name}
          </li>
        ))}
      </ul>

      {showEditModal && (
        <EditListModal
          id={id}
          name={name}
          selectedMovementIds={movements.map(({ id }) => id)}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteConfirmation && (
        <Modal
          onClose={() => setShowDeleteConfirmation(false)}
          icon={<TrashIcon className="size-4" />}
          className="flex flex-col gap-2"
        >
          <p>Are you sure you want to delete &quot;{name}&quot;?</p>
          {error && <p className="text-danger">{error}</p>}
          <Button className="bg-danger!" onClick={deleteList}>
            Delete
          </Button>
        </Modal>
      )}
    </div>
  );
}
