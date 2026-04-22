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
  prep: string;
  usage: string;
  notes: string;
  categories: string[];
  categoryIds: string[];
  level?: string;
  levelId?: string;
  levelColor?: string;
  statusId: string;
  statusName: string;
};

export type ListMovement = Movement & {
  checked: boolean;
};

export type SearchControls = {
  tabIndex: number;
  searchTerm: string;
  filter: { level: string };
};
