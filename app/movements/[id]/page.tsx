"use client";

import List from "@/app/dashboard/list";
import type { List as ListType, Status } from "@/app/types";
import Modal from "@/app/ui/modal";
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Textarea,
} from "@headlessui/react";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { categoriesToIcons } from "../constants";
import { Movement } from "../types";

export const dynamic = "force-dynamic";

function MovementPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <Link
        href="/movements"
        className="inline-flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-primary-text transition-colors w-fit"
      >
        <ArrowLeftIcon className="size-4 shrink-0" />
        Back to movements
      </Link>
      {children}
    </main>
  );
}

export default function MovementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [movement, setMovement] = useState<Movement | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [lists, setLists] = useState<ListType[]>([]);

  const [name, setName] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);

  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);
  const router = useRouter();

  const filteredLists = useMemo(() => {
    return (lists ?? []).filter(({ movements }) =>
      movements.some(({ id: movementId }) => movementId === id),
    );
  }, [lists, id]);

  const updateStatus = async (statusId: string | null) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, statusId }),
      })
    ).json();
    if (response.ok) router.refresh();

    setError(response?.error ?? null);
  };

  const updateName = async (newName: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, name: newName }),
      })
    ).json();
    if (response.ok) {
      setName(newName);
      setMovement((prev) => (prev ? { ...prev, name: newName } : null));
    }
    setError(response?.error ?? null);
  };

  const updateDescription = async (newDescription: string) => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "PATCH",
        body: JSON.stringify({ id, description: newDescription }),
      })
    ).json();
    if (response.ok) setDescription(newDescription);
    setError(response?.error ?? null);
  };

  const deleteMovement = async () => {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      })
    ).json();
    setError(response?.error ?? null);
    if (response.ok) {
      router.refresh();
      setShowDeleteConfirmation(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovement(data);
        setName(data?.name ?? "");
        setDescription(data?.description ?? null);
      });

    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/statuses`)
      .then((response) => response.json())
      .then((data) => setStatuses(data));

    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
      .then((response) => response.json())
      .then((data) => setLists(data));
  }, [id]);

  if (!movement) {
    return (
      <MovementPageWrapper>
        <div className="bg-secondary-bg rounded-lg p-8 text-center text-gray-300">
          Movement not found.
        </div>
      </MovementPageWrapper>
    );
  }

  const Icon = categoriesToIcons[movement.category] ?? null;

  return (
    <MovementPageWrapper>
      <article className="bg-secondary-bg rounded-lg p-4 flex flex-col gap-4">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-4 min-w-0">
            <div
              className="shrink-0 flex items-center justify-center p-2.5 rounded-full"
              style={{ backgroundColor: movement.levelColor }}
              title={`${movement.category} (${movement.level})`}
            >
              {Icon ? <Icon className="size-6" /> : null}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 min-w-0">
                {isEditingName ? (
                  <Input
                    defaultValue={name}
                    onChange={() => {}}
                    onBlur={(e) => {
                      updateName(e.target.value);
                      setIsEditingName(false);
                    }}
                    className="text-2xl font-bold wrap-break-word leading-tight w-full min-w-0 rounded-lg border-none bg-primary-text/5 px-3 py-1.5 text-primary-text focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-primary-text/25"
                  />
                ) : (
                  <h1
                    className="text-2xl font-bold wrap-break-word leading-tight cursor-text"
                    onClick={() => setIsEditingName(!isEditingName)}
                  >
                    {name}
                  </h1>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-xs bg-tertiary-bg px-2 py-1 rounded-full"
                    style={{ backgroundColor: movement.levelColor }}
                  >
                    {movement.level}
                  </span>
                  <span className="text-xs bg-tertiary-bg px-2 py-1 rounded-full flex items-center gap-1">
                    {Icon ? <Icon className="size-4" /> : null}{" "}
                    {movement.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Menu>
            <MenuButton
              className="flex items-center gap-1 bg-tertiary-bg! hover:text-gray-500!"
              onClick={(e) => e.preventDefault()}
            >
              {movement.statusName}
              <ChevronDownIcon className="size-4" />
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
                  {statuses.map(({ id, name: statusName }) => (
                    <Radio
                      key={id}
                      value={id}
                      className="flex items-center cursor-pointer gap-2 p-2 py-1.5 hover:bg-tertiary-bg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {id === movement.statusId ? (
                        <CheckIcon className="size-3" />
                      ) : (
                        <div className="size-3" />
                      )}
                      <div>{statusName}</div>
                    </Radio>
                  ))}
                </RadioGroup>
              </MenuItem>

              {/* <MenuItem>
                <div
                  className="flex cursor-pointer gap-2 p-2 hover:bg-tertiary-bg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PencilIcon className="size-4" />
                  <div>Edit</div>
                </div>
                </MenuItem>  */}
            </MenuItems>
          </Menu>
        </header>

        {description ? (
          <section className="border-t border-tertiary-bg pt-4 space-y-2">
            {isEditingDescription ? (
              <Textarea
                rows={2}
                className="w-full resize-none rounded-lg border-none bg-primary-text/5 px-3 py-1.5 text-sm/6 text-primary-text focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-primary-text/25"
                defaultValue={description}
                onChange={() => {}}
                onBlur={(e) => {
                  updateDescription(e.target.value);
                  setIsEditingDescription(false);
                }}
              />
            ) : (
              <p
                className="text-sm font-light leading-relaxed whitespace-pre-wrap"
                onClick={() => setIsEditingDescription(!isEditingDescription)}
              >
                {description}
              </p>
            )}
          </section>
        ) : null}

        <hr className="border-tertiary-bg" />

        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="bg-tertiary-bg px-2 py-1 rounded-full font-light">
              {filteredLists.length > 0
                ? `Appears in ${filteredLists.length} lists:`
                : "Does not appear in any lists"}
            </div>

            <Menu>
              <MenuButton className="flex items-center gap-1">
                <PlusIcon className="size-4" />
                <div>Add to List</div>
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="flex flex-col z-10 border border-tertiary-bg bg-secondary-bg rounded-sm cursor-pointer outline-none"
              >
                {lists.map(({ id, name }) => {
                  const alreadyContainsMovement = filteredLists.some(
                    ({ id: filteredListId }) => filteredListId === id,
                  );
                  return (
                    <MenuItem
                      key={id}
                      as="button"
                      type="button"
                      className={`rounded-none! p-2 bg-secondary-bg! hover:bg-tertiary-bg! text-left ${
                        alreadyContainsMovement
                          ? "opacity-50 cursor-not-allowed!"
                          : ""
                      }`}
                      disabled={alreadyContainsMovement}
                    >
                      {name}
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </Menu>
          </div>

          <ul className="flex flex-col gap-2">
            {filteredLists.length > 0 &&
              filteredLists.map(({ id, name, movements }) => (
                <List key={id} id={id} name={name} movements={movements} />
              ))}
          </ul>
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
          <p>Are you sure you want to delete &quot;{name}&quot;?</p>
          <Button className="bg-danger!" onClick={deleteMovement}>
            Delete
          </Button>
          {error && <p className="text-danger">{error}</p>}
        </Modal>
      )}
    </MovementPageWrapper>
  );
}
