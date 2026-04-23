"use client";

import type { List as UserList } from "@/app/types";
import type { ReactNode } from "react";
import List from "./list";

type Props = {
  lists: UserList[];
  /** Optional control shown next to the title (e.g. AddListModal on your profile). */
  headerRight?: ReactNode;
};

export default function ProfileListsSection({ lists, headerRight }: Props) {
  return (
    <section className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/3*100%-0.5rem)] max-w-full">
      {headerRight ? (
        <div className="flex items-center gap-2 justify-between">
          <div className="text-sm uppercase font-bold">My Lists</div>
          {headerRight}
        </div>
      ) : (
        <div className="text-sm uppercase font-bold">My Lists</div>
      )}
      <div className="flex flex-col gap-2">
        {lists.map(({ id, name, movements }) => (
          <List key={id} id={id} name={name} movements={movements} />
        ))}
      </div>
    </section>
  );
}
