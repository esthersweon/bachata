import { PlusIcon } from "@heroicons/react/24/outline";

const combos = [
  {
    name: "Basic Intro",
    description: "Basic + Right turn + Basic",
  },
  {
    name: "Sensual Turn",
    description: "Basic + Right turn + Contra turn + Body roll + Sensual Basic",
  },
];

export default function MyCombos() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2>My Combos</h2>
        <button className="flex items-center gap-2">
          <PlusIcon className="size-4" /> Add Combo
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {combos.map(({ name, description }) => (
          <li key={name} className="bg-black p-4 rounded-lg">
            <h4>{name}</h4>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
