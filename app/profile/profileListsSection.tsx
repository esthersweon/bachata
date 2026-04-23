"use client";

import type { List as UserList } from "@/app/types";
import AddListModal from "./addListModal";
import List from "./list";

type Props = {
  title: string;
  lists: UserList[];
  allowEditing?: boolean;
};

export default function ProfileListsSection({
  title,
  lists,
  allowEditing,
}: Props) {
  return (
    <section className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/3*100%-0.5rem)] max-w-full">
      <div className="flex items-center gap-2 justify-between">
        <div className="text-sm uppercase font-bold">{title}</div>
        {allowEditing ? <AddListModal /> : null}
      </div>

      <div className="flex flex-col gap-2">
        {lists.map(({ id, name, movements }) => (
          <List
            key={id}
            id={id}
            name={name}
            movements={movements}
            allowEditing={allowEditing}
          />
        ))}
      </div>
    </section>
  );
}
