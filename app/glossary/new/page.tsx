import Link from "next/link";
import { levelFilters } from "../../mockData";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col space-y-4">
          <Link href="/glossary">
            <button>Back to Glossary</button>
          </Link>
          <div className="w-[50%] mx-auto flex flex-col space-y-2">
            <h1>Add Movement</h1>
            <form className="space-y-2">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
              </div>
              <div>
                <label htmlFor="level">Level</label>
                <select id="level" name="level">
                  {levelFilters.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
