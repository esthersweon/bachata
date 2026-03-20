import mockData from "../mockData";

const SearchResults = ({
  filter,
  searchTerm,
}: {
  filter: { level: string };
  searchTerm: string;
}) => {
  const results = mockData.filter(
    ({ name, category }) =>
      (searchTerm === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      [category.id, "all"].includes(filter.level),
  );

  return (
    <>
      <ul className="space-y-2">
        {results.map(({ id, name, description, category, color }) => (
          <li key={id} className="bg-gray-700 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <h3>{name}</h3>
              <button className="text-xs" style={{ backgroundColor: color }}>
                {category.name}
              </button>
            </div>
            <p className="text-xs">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
