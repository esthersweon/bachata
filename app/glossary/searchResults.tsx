import mockData from "../mockData";

const SearchResults = ({
  filter,
  searchTerm,
}: {
  filter: string;
  searchTerm: string;
}) => {
  const results = mockData.filter(
    ({ name, category }) =>
      (searchTerm === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      [category.id, "all"].includes(filter),
  );

  return (
    <>
      <ul className="space-y-2">
        {results.map(({ id, name, description, category, color }) => (
          <li key={id}>
            <div className="flex justify-between items-center w-100 max-w-[50%]">
              <h3>{name}</h3>
              <button className="text-xs" style={{ backgroundColor: color }}>
                {category.name}
              </button>
            </div>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
