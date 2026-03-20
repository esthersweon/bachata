import { categoryFilters } from "../mockData";

export default function CategoryTabs({
  tabIndex,
  setTabIndex,
}: {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}) {
  return (
    <div tabIndex={tabIndex} className="flex gap-1 cursor-pointer">
      {categoryFilters.map(({ id, name, icon: Icon }) => (
        <div
          key={id}
          className={`${tabIndex === (id ?? 0) ? "font-bold" : ""} bg-gray-800 py-1 px-4 rounded-t-lg flex items-center gap-2`}
          onClick={() => setTabIndex(id ?? 0)}
        >
          <Icon className="size-4" />
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
}
