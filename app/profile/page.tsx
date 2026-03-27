import {
  CakeIcon,
  CalendarIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MyBadges from "./myBadges";
import MyCombos from "./myCombos";
import MyLists from "./myLists";

const futureEvents = [
  {
    name: "Joliet",
    image:
      "https://danceruniversity.com/wp-content/uploads/2025/01/PHOTO-2026-03-22-21-03-17.jpg",
    date: "Saturday, March 25th",
    rsvp: "YES",
    attendees: ["John", "Jane", "Mary"],
  },
  {
    name: "Victorian",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2HQAQqfprQvLvdhp16l99UEuwhIOBTewGQ&s",
    date: "Sunday, April 15th",
    rsvp: "NO",
    attendees: ["Mary"],
  },
];

const pastEvents = [
  {
    name: "Crown",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jVip330b1K30d_gO9oTKAuHPu3lXM-2a0A&s",
    date: "Friday, May 15th",
    rsvp: "UNDECIDED",
    attendees: ["Mary"],
  },
  {
    name: "The Continental",
    image:
      "https://images.momence.com/h/40391/session-template-banner/e1261ff9-c2c0-4a43-a095-1e5a781ad4b6.jpg",
    date: "Monday, Jun 2nd",
    rsvp: "YES",
    attendees: ["Jane"],
  },
];

export default async function Profile() {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-center items-center gap-4">
        <img
          src="https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png"
          alt="Jane Kim"
          className="size-30 rounded-full"
        />

        <div className="flex flex-col items-center gap-2">
          <h1>Jane Kim</h1>

          <div className="text-xs bg-gray-800 p-2 rounded-full">Follow</div>

          <div className="flex gap-2">
            <div>
              <span className="cursor-pointer font-bold">87</span> Followers
            </div>
            <div>
              <span className="cursor-pointer font-bold">124</span> Following
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CakeIcon className="size-4" />
              <div>Dance anniversary: October 2025</div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4" />
              <div>Events attended: 22</div>
            </div>
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

      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col flex-wrap gap-2 bg-gray-800 p-4 rounded-lg">
          <MyBadges />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg flex-1 grow-0 basis-[calc(1/3*100%-0.5rem)] max-w-full">
            <h2>Upcoming Events</h2>
            <ul className="flex flex-col gap-2">
              {futureEvents.map(({ name, image, date }) => (
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
                    <p>{date}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h2>Past Events</h2>
            <ul className="flex flex-col gap-2">
              {pastEvents.map(({ name, image, date }) => (
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
                    <p>{date}</p>
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
