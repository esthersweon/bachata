"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Status } from "../types";
import Modal from "../ui/modal";
import { Movement } from "./types";

export default function MovementMenu({
  statuses,
  ...movement
}: Movement & { statuses: Status[] }) {
  const router = useRouter();

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(
    movement.statusId,
  );

  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (statusId: string | null) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id: movement.id, statusId }),
      })
    ).json();
    if (response.ok) router.refresh();

    setError(response?.error ?? null);
  };

  const deleteMovement = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "DELETE",
        body: JSON.stringify({ id: movement.id }),
      })
    ).json();
    if (response.ok) {
      router.refresh();
      setShowDeleteConfirmation(false);
    }

    setError(response?.error ?? null);
  };

  return (
    <>
      <Menu>
        <MenuButton
          className="bg-secondary-bg! p-0! hover:text-gray-500!"
          onClick={(e) => e.preventDefault()}
        >
          <EllipsisVerticalIcon className="size-4" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none"
        >
          <MenuItem>
            <RadioGroup
              value={selectedStatusId}
              onChange={(value) => {
                setSelectedStatusId(value);
                updateStatus(value);
              }}
              className="border-b border-tertiary-bg"
            >
              {statuses.map(({ id, name }) => (
                <Radio
                  key={id}
                  value={id}
                  className="flex items-center cursor-pointer gap-2 p-2 py-1.5 hover:bg-tertiary-bg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {id === selectedStatusId ? (
                    <CheckIcon className="size-3" />
                  ) : (
                    <div className="size-3" />
                  )}
                  <div>{name}</div>
                </Radio>
              ))}
            </RadioGroup>
          </MenuItem>

          <MenuItem>
            <div
              className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
              onClick={(e) => e.stopPropagation()}
            >
              <PlusIcon className="size-4" />
              <div>Add to List</div>
            </div>
          </MenuItem>

          <MenuItem>
            <div
              className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
              onClick={(e) => e.stopPropagation()}
            >
              <PencilIcon className="size-4" />
              <div>Edit</div>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirmation(true);
              }}
            >
              <TrashIcon className="size-4" />
              <div>Delete</div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
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
        </Modal>
      )}
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
