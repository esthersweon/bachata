"use client";

import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Checkbox from "../ui/checkbox";
import Modal from "../ui/modal";
import { Movement } from "./types";

export default function MovementMenu(movement: Movement) {
  const router = useRouter();

  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [search, setSearch] = useState<string>("");
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [newListName, setNewListName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const filteredLists = lists.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  const createNewList = async () => {
    if (!newListName) {
      setError("Please enter a name for the new list");
      return;
    }
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`, {
        method: "POST",
        body: JSON.stringify({ name: newListName }),
      })
    ).json();
    if (response.ok) {
      setLists([...lists, { id: response.id, name: newListName }]);
      setError(null);
    } else {
      setError(response.error ?? "Failed to create new list");
    }
  };

  const addToList = async (listId: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "POST",
        body: JSON.stringify({ movementIds: [movement.id], listIds: [listId] }),
      })
    ).json();
    setError(response?.error ?? null);
  };

  const removeFromList = async (listId: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists/movements`, {
        method: "DELETE",
        body: JSON.stringify({ movementId: movement.id, listIds: [listId] }),
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
    if (response.ok) {
      router.refresh();
      setShowDeleteConfirmation(false);
    }
    setError(response?.error ?? null);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
      .then((response: Response) => response.json())
      .then(
        (data: { id: string; name: string; movements: { id: string }[] }[]) => {
          setLists(data);
          setSelectedListIds(
            data
              .filter(({ movements }) =>
                movements.some(({ id }) => id === movement.id),
              )
              .map(({ id }) => id),
          );
        },
      );
  }, []);

  return (
    <>
      <Menu>
        <MenuButton className="bg-gray-800! p-0! hover:text-gray-500!">
          <EllipsisVerticalIcon className="size-4" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="z-10 border border-gray-700 bg-gray-800 rounded-md cursor-pointer"
        >
          {[
            {
              title: "Add to List",
              icon: PlusIcon,
              onClick: () => setShowAddToListModal(true),
            },
            {
              title: "Delete",
              icon: TrashIcon,
              onClick: () => setShowDeleteConfirmation(true),
            },
          ].map(({ title, icon: Icon, onClick }) => (
            <MenuItem key={title}>
              <div
                className="p-2 data-focus:bg-gray-700 flex items-center gap-2"
                onClick={onClick}
              >
                <Icon className="size-4" />
                <div>{title}</div>
              </div>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      {showAddToListModal && (
        <Modal
          icon={<PlusIcon className="size-4" />}
          title={`Add "${movement.name}" to List`}
          onClose={() => setShowAddToListModal(false)}
        >
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Search for a list"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />

              <ul className="flex flex-col gap-2">
                {filteredLists.map(({ id: listId, name }) => (
                  <li
                    key={listId}
                    className="flex gap-2 items-center p-2 rounded-md cursor-pointer"
                    onClick={() => {
                      if (selectedListIds.includes(listId)) {
                        setSelectedListIds(
                          selectedListIds.filter((id) => id !== listId),
                        );
                        removeFromList(listId);
                      } else {
                        setSelectedListIds([...selectedListIds, listId]);
                        addToList(listId);
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

            <div className="flex justify-between gap-4">
              <Input
                type="text"
                placeholder="New List"
                className="w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewListName(e.target.value)
                }
              />

              <button
                className="flex items-center gap-2"
                onClick={createNewList}
                disabled={!newListName}
              >
                <PlusIcon className="size-4" />
                <div>Create New List</div>
              </button>
            </div>
          </div>
        </Modal>
      )}
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
    </>
  );
}
