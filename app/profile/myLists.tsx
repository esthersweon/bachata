import { PlusIcon } from "@heroicons/react/24/outline";
import { Movement } from "../glossary/types";

export default async function MyLists() {
  const lists = await (
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`)
  ).json();

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>My Lists</h2>

        <button className="flex items-center gap-2">
          <PlusIcon className="size-4" /> Add List
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {lists.map(
          ({
            id,
            name,
            movements = [],
          }: {
            id: string;
            name: string;
            movements: Movement[];
          }) => (
            <li key={id} className="bg-black p-4 rounded-lg">
              <h4>{name}</h4>
              <ul>
                {movements.map(({ id, name }: { id: string; name: string }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </>
  );
}
