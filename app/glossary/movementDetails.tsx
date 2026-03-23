import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../ui/modal";
import type { SearchResult } from "./types";

export default function MovementDetails({
  name,
  description,
}: Pick<SearchResult, "name" | "description">) {
  return (
    <Modal
      title={name}
      triggerNode={<InformationCircleIcon className="size-4" />}
    >
      <div className="flex flex-col gap-2">
        <p>{description}</p>
      </div>
    </Modal>
  );
}
