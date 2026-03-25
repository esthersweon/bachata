export type MovementCategory = {
  id: string;
  name: string;
  description: string;
};

export type MovementLevel = {
  id: string;
  name: string;
  color: string;
};

export type Movement = {
  id: string;
  name: string;
  description: string;
  category: string;
  level: string;
  levelColor: string;
};

export type SearchControls = {
  tabIndex: number;
  searchTerm: string;
  filter: { level: string };
};
