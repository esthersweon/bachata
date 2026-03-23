import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  All: CheckCircleIcon,
  Footwork: SparklesIcon,
  "Turns and spins": ArrowPathIcon,
  Isolations: ArrowsRightLeftIcon,
  "Sensual moves": FireIcon,
};

export const categoryFilters: {
  id: string;
  name: string;
  description: string;
}[] = [
  {
    id: "",
    name: "All",
    description: "All categories",
  },
  {
    id: "1",
    name: "Footwork",
    description: "Footwork movements",
  },
  {
    id: "2",
    name: "Turns and spins",
    description: "Turns and spins movements",
  },
  {
    id: "3",
    name: "Isolations",
    description: "Body isolations movements",
  },
  {
    id: "4",
    name: "Sensual moves",
    description: "Sensual bachata movements",
  },
];

export const levelFilters: {
  id: string;
  name: string;
  description: string;
  abbreviation: string;
  color: string;
}[] = [
  {
    id: "",
    name: "All",
    abbreviation: "All",
    description: "All categories",
    color: "gray",
  },
  {
    id: "1",
    name: "Beginner",
    abbreviation: "Beg.",
    description: "< 6 months",
    color: "green",
  },
  {
    id: "2",
    name: "Intermediate",
    abbreviation: "Int.",
    description: "6 months - 1 year",
    color: "orange",
  },
  {
    id: "3",
    name: "Advanced",
    abbreviation: "Adv.",
    description: "> 1 year",
    color: "red",
  },
];
