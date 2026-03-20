export const glossaryCategories = [
  {
    id: "all",
    name: "All",
    description: "All categories",
    color: "gray",
  },
  {
    id: "1",
    name: "Beginner",
    description: "< 6 months",
    color: "green",
  },
  {
    id: "2",
    name: "Intermediate",
    description: "6 months - 1 year",
    color: "orange",
  },
  {
    id: "3",
    name: "Advanced",
    description: "> 1 year",
    color: "red",
  },
];

export default [
  {
    id: 1,
    name: "Basic Step",
    description: "The foundation",
    category: glossaryCategories[1],
    color: glossaryCategories[1].color,
  },
  {
    id: 2,
    name: "Racinto Step",
    description: "A variation of the basic step",
    category: glossaryCategories[1],
    color: glossaryCategories[1].color,
  },
  {
    id: 3,
    name: "Madrid Step",
    description: "Diagonal movement",
    category: glossaryCategories[2],
    color: glossaryCategories[2].color,
  },
  {
    id: 4,
    name: "Contra Turn",
    description: "You go wheee",
    category: glossaryCategories[3],
    color: glossaryCategories[3].color,
  },
  {
    id: 5,
    name: "Sensual Basic Step",
    description: "Infinity hips",
    category: glossaryCategories[1],
    color: glossaryCategories[1].color,
  },
];
