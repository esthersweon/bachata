"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../ui/modal";

export default function DeleteMovementButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const deleteMovement = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/movements`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      <TrashIcon
        className="size-4 hidden group-hover:block"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          icon={<TrashIcon className="size-4" />}
          className="flex flex-col gap-2"
        >
          <p>Are you sure you want to delete &quot;{name}&quot;?</p>
          <div className="self-end">
            <button
              className="bg-red-500!"
              onClick={() => {
                deleteMovement(id);
                router.refresh();
                setShowModal(false);
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
