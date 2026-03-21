import mockData from "../mockData";
import MovementDetails from "./movementDetails";

const SearchResults = ({
  controls: { tabIndex, searchTerm, filter },
  selectedMovementId,
  setTabIndex,
  setSelectedMovementId,
}: {
  controls: { tabIndex: number; searchTerm: string; filter: { level: string } };
  selectedMovementId: number | null;
  setTabIndex: (idx: number) => void;
  setSelectedMovementId: (id: number | null) => void;
}) => {
  const results = mockData.filter(
    ({ name, level, category }) =>
      (searchTerm === "" ||
        name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      [level.id, ""].includes(filter.level) &&
      [category.id, 0].includes(tabIndex),
  );

  return (
    <>
      {results.length === 0 && (
        <div className="text-gray-300 h-20 flex items-center justify-center">
          No results found. Please adjust your search criteria.
        </div>
      )}
      <ul className="flex flex-wrap gap-2 space-y-1">
        {results.map(({ id, name, description, color, category }) => (
          <li
            key={id}
            className="flex-1 bg-gray-800 py-2 px-4 rounded-lg basis-[calc(1/3*100%-0.5rem)] min-w-75 max-w-full"
            style={{
              outline: selectedMovementId === id ? "1px solid white" : "none",
            }}
            onClick={() =>
              setSelectedMovementId(id !== selectedMovementId ? id : null)
            }
          >
            <div className="flex justify-between items-center gap-8">
              <h4 className="text-nowrap">{name}</h4>
              <div className="flex gap-2 items-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>

                <button
                  className="text-xs bg-gray-700! flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTabIndex(category.id);
                  }}
                >
                  {category.icon && <category.icon className="size-4" />}
                </button>

                <MovementDetails movementId={id} />
              </div>
            </div>
            <p className="text-xs font-light">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
