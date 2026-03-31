import { CakeIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../helpers";
import { Event } from "../types";
import MyBadges from "./myBadges";
import MyCombos from "./myCombos";
import MyLists from "./myLists";

export default async function Profile() {
  const events: Event[] = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events`,
  ).then((response) => response.json());

  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-center items-center gap-4">
        <img
          src="https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png"
          alt="Jane Kim"
          className="size-30 rounded-full"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h1>Jane Kim</h1>
            <div className="text-xs bg-gray-800 px-2 py-1 rounded-full">
              Follow
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <span className="cursor-pointer font-bold">87</span> Followers
            </div>
            <div>
              <span className="cursor-pointer font-bold">124</span> Following
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <CakeIcon className="size-3" />
            <div>Dancing since Oct 2025</div>
          </div>

          <div className="flex gap-2 justify-center">
            <button className="flex items-center gap-2">
              <UserIcon className="size-4" />
              <div>Follow</div>
            </button>
            <button className="flex items-center gap-2">
              <InboxIcon className="size-4" />
              <div>Message</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 px-10">
        <MyBadges />

        <div className="flex flex-wrap gap-2 w-full">
          <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg flex-1 grow-0 basis-[calc(1/3*100%-0.5rem)] max-w-full">
            <h2>Upcoming Events</h2>
            <ul className="flex flex-col gap-2">
              {events
                .filter(({ date }) => new Date(date) >= new Date())
                .map(({ name, image, date }) => (
                  <li
                    key={name}
                    className="bg-black p-4 rounded-lg flex items-center gap-2"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="size-10 object-cover"
                    />
                    <div>
                      <h4>{name}</h4>
                      <p>{formatDate(date)}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <h2>Past Events</h2>
            <ul className="flex flex-col gap-2">
              {events
                .filter(({ date }) => new Date(date) < new Date())
                .map(({ name, image, date }) => (
                  <li
                    key={name}
                    className="bg-black p-4 rounded-lg flex items-center gap-2"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="size-10 object-cover"
                    />
                    <div>
                      <h4>{name}</h4>
                      <p>{formatDate(date)}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg flex-1 grow-0 basis-[calc(1/3*100%-0.5rem)] max-w-full">
            <MyLists />
          </div>

          <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg flex-1 grow-0 basis-[calc(1/3*100%-0.5rem)] max-w-full">
            <MyCombos />
          </div>
        </div>
      </div>
    </main>
  );
}
