import { NextRequest } from "next/server";

const categoryFilters: {
  id: string;
  name: string;
  description: string;
}[] = [
  {
    id: "0",
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

const levelFilters: {
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

const mockData = [
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const level = searchParams.get("level") ?? "";
  const category = searchParams.get("category") ?? "";

  return Response.json(
    mockData.filter(
      ({ name, level: dataLevel, category: dataCategory }) =>
        (q === "" || name.toLowerCase().includes(q.toLowerCase())) &&
        [dataLevel.id, ""].includes(level) &&
        [dataCategory.id, ""].includes(category),
    ),
    { headers: { "Content-Type": "application/json" } },
  );
}

export async function POST(request: Request) {
  const { name, description, level, color, category } = await request.json();

  const newMovement = {
    id: Date.now(),
    name,
    description,
    level,
    color,
    category,
  };

  return new Response(JSON.stringify(newMovement), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
