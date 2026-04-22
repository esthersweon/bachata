import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  FireIcon,
  RectangleStackIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const categoriesToIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  All: CheckCircleIcon,
  Frames: RectangleStackIcon,
  Footwork: SparklesIcon,
  "Turns and spins": ArrowPathIcon,
  Isolations: ArrowsRightLeftIcon,
  "Sensual moves": FireIcon,
  Dips: ArrowDownCircleIcon,
};
