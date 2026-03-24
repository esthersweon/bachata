export type MovementCategory = {
  id: string;
  name: string;
  description: string;
};

export type Movement = {
  id: string;
  name: string;
  description: string;
  category: string;
  level: string;
};

export type SearchControls = {
  tabIndex: number;
  searchTerm: string;
  filter: { level: string };
};
