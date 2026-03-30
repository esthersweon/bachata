import { Checkbox as HeadlessUICheckbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Checkbox({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked?: () => void;
}) {
  return (
    <HeadlessUICheckbox
      checked={checked}
      onChange={setChecked}
      className="group size-6 rounded-md bg-white/10 p-1 data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
    >
      <CheckIcon className="hidden size-4 stroke-black group-data-checked:block" />
    </HeadlessUICheckbox>
  );
}
