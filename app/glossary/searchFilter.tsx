import { FunnelIcon } from "@heroicons/react/24/outline";
import { categoryFilters, levelFilters } from "../mockData";
import Modal from "../ui/modal";

export default function SearchFilter({
  filter,
  setFilter,
}: {
  filter: { level: string };
  setFilter: (filter: { level: string }) => void;
}) {
  return (
    <Modal
      title="Filters"
      buttonContent={
        <button>
          <FunnelIcon aria-hidden="true" className="size-6 text-white" />
        </button>
      }
      className="flex flex-col gap-2"
    >
      <h3>Levels</h3>
      <div className="flex gap-2">
        {levelFilters.map(({ color, id, abbreviation }) => (
          <button
            className="text-xs"
            style={{
              backgroundColor: color,
              border: filter.level === id ? "2px solid white" : "none",
            }}
            onClick={() => setFilter({ level: id })}
          >
            {abbreviation}
          </button>
        ))}
      </div>
      <h3>Categories</h3>
      <div className="flex gap-2">
        {categoryFilters.map(({ id, name }) => (
          <button key={id} className="text-xs bg-gray-700!">
            {name}
          </button>
        ))}
      </div>
    </Modal>
  );
}
