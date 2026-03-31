"use client";

import {
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
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Status } from "../types";
import Modal from "../ui/modal";
import { Movement } from "./types";

export default function MovementMenu(movement: Movement) {
  const [hasFetchedStatuses, setHasFetchedStatuses] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [statuses, setStatuses] = useState<Status[]>([]);
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

    setError(response?.error ?? null);
  };

  const deleteMovement = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "DELETE",
        body: JSON.stringify({ id: movement.id }),
      })
    ).json();
    if (response.ok) setShowDeleteConfirmation(false);

    setError(response?.error ?? null);
  };

  useEffect(() => {
    if (hasFetchedStatuses) return;
    setHasFetchedStatuses(true);
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses`)
      .then((response: Response) => response.json())
      .then((data: Status[]) => setStatuses(data));
  }, []);

  return (
    <>
      <Menu>
        <MenuButton className="bg-gray-800! p-0! hover:text-gray-500!">
          <EllipsisVerticalIcon className="size-4" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="z-10 border border-gray-700 bg-gray-800 rounded-sm cursor-pointer"
        >
          <MenuItem>
            <RadioGroup
              value={selectedStatusId}
              onChange={(value) => {
                setSelectedStatusId(value);
                updateStatus(value);
              }}
              className="border-b border-gray-700"
            >
              {statuses.map(({ id, name }) => (
                <Radio
                  key={id}
                  value={id}
                  className="flex items-center cursor-pointer gap-2 p-2 py-1.5 hover:bg-gray-700"
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
              className="flex cursor-pointer gap-2 p-2 hover:bg-gray-700"
              onClick={() => setShowDeleteConfirmation(true)}
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
          <div className="self-end">
            <button className="bg-red-500!" onClick={deleteMovement}>
              Delete
            </button>
          </div>
        </Modal>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
