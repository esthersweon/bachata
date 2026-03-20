import { InformationCircleIcon } from "@heroicons/react/24/outline";
import mockData from "../mockData";
import Modal from "../ui/modal";

export default function MovementDetails({
  movementId,
}: {
  movementId: number;
}) {
  const movement = mockData.find(
    ({ id }) => id === movementId,
  ) as (typeof mockData)[number];
  return (
    <Modal
      title={movement.name}
      buttonContent={<InformationCircleIcon className="size-4" />}
    >
      <div className="flex flex-col gap-2">
        <p>{movement?.description}</p>
      </div>
    </Modal>
  );
}
