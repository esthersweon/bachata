import { Tab, TabGroup, TabList } from "@headlessui/react";
import { categoryFilters } from "../mockData";

export default function CategoryTabs({
  tabIndex,
  setTabIndex,
}: {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}) {
  return (
    <TabGroup tabIndex={tabIndex}>
      <TabList className="flex gap-1 cursor-pointer">
        {categoryFilters.map(({ id, name, icon: Icon }) => (
          <Tab
            key={id}
            onClick={() => setTabIndex(id ?? 0)}
            className={`${tabIndex === (id ?? 0) ? "font-bold bg-blue-900!" : "bg-gray-900!"} rounded-full! flex items-center gap-2`}
          >
            <Icon className="size-4" />
            <div>{name}</div>
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
}
