import ActivitiesFeed, { activities } from "./home/activitiesFeed";
import UserRecommendations from "./home/userRecommendations";

const events = [
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
  {
    name: "Crown Social",
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

const rsvpToLabel = {
  YES: { label: "Attending", color: "green" },
  NO: { label: "Not attending", color: "red" },
  UNDECIDED: { label: "Undecided", color: "gray" },
};

export default function Home() {
  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-4 bg-gray-800 p-4 rounded-lg">
          <h2>Upcoming events</h2>
          <ul className="flex flex-wrap gap-2">
            {events.map((event) => (
              <li
                key={event.name}
                className="basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col bg-black rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-40 object-cover"
                />
                <div className="flex flex-col gap-1 p-4">
                  <div className="flex flex-wrap justify-between gap-1 items-center">
                    <h3>{event.name}</h3>

                    <div
                      style={{
                        backgroundColor:
                          rsvpToLabel[event.rsvp as keyof typeof rsvpToLabel]
                            .color,
                      }}
                      className="px-2 py-1 rounded-full"
                    >
                      {
                        rsvpToLabel[event.rsvp as keyof typeof rsvpToLabel]
                          .label
                      }
                    </div>
                  </div>
                  <p>{event.date}</p>
                  <p>Friends attending: {event.attendees.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
          <ActivitiesFeed />
        </div>

        {activities.length > 0 && (
          <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
            <UserRecommendations />
          </div>
        )}
      </div>
    </main>
  );
}
