import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  FireIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const categoriesToIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  All: CheckCircleIcon,
  Frames: UsersIcon,
  Footwork: SparklesIcon,
  "Turns and spins": ArrowPathIcon,
  Isolations: ArrowsRightLeftIcon,
  "Sensual moves": FireIcon,
};
