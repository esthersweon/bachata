import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const categoriesToIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  All: CheckCircleIcon,
  Footwork: SparklesIcon,
  "Turns and spins": ArrowPathIcon,
  Isolations: ArrowsRightLeftIcon,
  "Sensual moves": FireIcon,
};
