export type SearchResult = {
  id: number;
  name: string;
  description: string;
  color: string;
  category: { id: number; name: string };
};

export type SearchControls = {
  tabIndex: number;
  searchTerm: string;
  filter: { level: string };
};
