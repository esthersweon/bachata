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
import { Movement } from "../movements/types";
import Modal from "../ui/modal";
import EditListModal from "./editListModal";

export default function List({
  id,
  name,
  movements,
}: {
  id: string;
  name: string;
  movements: Movement[];
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
    <div
      key={id}
      className="flex-1 flex flex-col gap-2 bg-primary-bg p-4 rounded-lg basis-1/3"
    >
      <h3
        key={id}
        className="text-nowrap flex items-center gap-2 justify-between"
      >
        <div>{name}</div>
        <Menu>
          <MenuButton className="bg-primary-bg! p-0! hover:text-primary-text/50!">
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
      </h3>
      <ul>
        {movements.map(({ id: movementId, name }) => (
          <li key={movementId}>{name}</li>
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
