import mockData from "../mockData";

const SearchResults = ({
  filter,
  searchTerm,
  tabIndex,
  selectedMovementId,
  setSelectedMovementId,
}: {
  filter: { level: string };
  searchTerm: string;
  tabIndex: number;
  selectedMovementId: number | null;
  setSelectedMovementId: (id: number | null) => void;
}) => {
  const results = mockData.filter(
    ({ name, level, category }) =>
      (searchTerm === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      [level.id, "all"].includes(filter.level) &&
      [category.id, 0].includes(tabIndex),
  );

  return (
    <>
      <ul className="space-y-2">
        {results.map(({ id, name, description, level, color, category }) => (
          <li
            key={id}
            className="bg-gray-800 p-2 rounded-lg"
            onClick={() => setSelectedMovementId(id)}
          >
            <div className="flex justify-between items-center">
              <h3>{name}</h3>
              <div className="flex gap-2">
                <button className="text-xs" style={{ backgroundColor: color }}>
                  {level.abbreviation}
                </button>
                <button className="text-xs bg-gray-700!">
                  {category.name}
                </button>
              </div>
            </div>
            <p className="text-xs">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
