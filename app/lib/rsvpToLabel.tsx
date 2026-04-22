import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const rsvpToLabel = {
  true: { icon: <CheckCircleIcon className="size-3" />, color: "green" },
  false: { icon: <XMarkIcon className="size-3" />, color: "red" },
  null: { icon: <QuestionMarkCircleIcon className="size-3" />, color: "gray" },
} as const;
