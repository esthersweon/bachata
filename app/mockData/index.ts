import {
  ArrowPathIcon,
  CheckCircleIcon,
  FireIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

export const categoryFilters: {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    id: 0,
    name: "All",
    description: "All categories",
    icon: CheckCircleIcon,
  },
  {
    id: 1,
    name: "Footwork",
    description: "Footwork movements",
    icon: MapIcon,
  },
  {
    id: 2,
    name: "Turns and spins",
    description: "Turns and spins movements",
    icon: ArrowPathIcon,
  },
  {
    id: 3,
    name: "Body isolations",
    description: "Body isolations movements",
    icon: FireIcon,
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

export default [
  {
    id: 1,
    name: "Basic Step",
    description: "The foundation",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[1],
  },
  {
    id: 2,
    name: "Racinto Step",
    description: "A variation of the basic step",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[1],
  },
  {
    id: 3,
    name: "Madrid Step",
    description: "Diagonal movement",
    level: levelFilters[2],
    color: levelFilters[2].color,
    category: categoryFilters[1],
  },
  {
    id: 4,
    name: "Contra Turn",
    description: "You go wheee",
    level: levelFilters[3],
    color: levelFilters[3].color,
    category: categoryFilters[2],
  },
  {
    id: 5,
    name: "Sensual Basic Step",
    description: "Infinity hips",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[1],
  },
  {
    id: 6,
    name: "Box step",
    description: "AKA Recinto Step",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[1],
  },
  {
    id: 7,
    name: "Right turn",
    description: "Turn to right",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[2],
  },
  {
    id: 8,
    name: "Left turn",
    description: "Turn to left",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[2],
  },
  {
    id: 9,
    name: "Hip isolations",
    description: "Isolate those hips",
    level: levelFilters[1],
    color: levelFilters[1].color,
    category: categoryFilters[3],
  },
];
