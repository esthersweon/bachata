import { getEvents } from "@/app/lib/events";
import { getLists } from "@/app/lib/lists";
import { CakeIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { formatDate } from "../helpers";
import AddListModal from "./addListModal";
import MyBadges from "./myBadges";
import MyProgress from "./myProgress";

export default async function Profile() {
  const lists = await getLists();
  const events = await getEvents();

  return (
    <main className="flex flex-col gap-8">
      <Suspense fallback={<div>Loading profile...</div>}>
        <div className="flex justify-center items-center gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/6993359?v=4"
            alt="Esther Weon"
            className="size-30 rounded-full"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <h1>Esther Weon</h1>
              <div className="text-xs bg-secondary-bg px-2 py-1 rounded-full">
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

        <div className="flex flex-col items-center gap-4">
          <MyBadges />

          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/4*100%-0.5rem)] max-w-full">
              <h2>Upcoming Events</h2>
              <ul className="flex flex-col gap-2">
                {events
                  .filter(({ date }) => new Date(date) >= new Date())
                  .map(({ name, image, date }) => (
                    <li
                      key={name}
                      className="bg-primary-bg p-4 rounded-lg flex items-center gap-2"
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
                      className="bg-primary-bg p-4 rounded-lg flex items-center gap-2"
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

            <div className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/4*100%-0.5rem)] max-w-full">
              <MyProgress />
            </div>

            <div className="flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full">
              <div className="flex items-center gap-2 justify-between">
                <h2>My Lists</h2>
                <AddListModal />
              </div>
              <div className="flex flex-wrap gap-2">
                {lists.map(({ id, name, movements }) => (
                  <div
                    key={id}
                    className="flex-1 flex flex-col gap-2 bg-primary-bg p-4 rounded-lg basis-1/3"
                  >
                    <h3 key={id} className="text-nowrap">
                      {name}
                    </h3>
                    <ul>
                      {movements.map(({ id: movementId, name }) => (
                        <li key={movementId}>{name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
