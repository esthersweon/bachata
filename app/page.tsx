import { getEvents } from "@/app/lib/events";
import { Suspense } from "react";
import { activities } from "./feed/activitiesFeed";
import UserRecommendations from "./feed/userRecommendations";
import { formatDate } from "./helpers";
import RsvpStatusMenu from "./profile/rsvpStatusMenu";

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <div className="flex-5 max-w-full flex flex-col gap-4 bg-secondary-bg p-4 rounded-lg">
          <div className="text-center uppercase font-bold">Upcoming events</div>
          <Suspense fallback={<div>Loading events...</div>}>
            <ul className="grid grid-cols-3 gap-2">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="flex-1 min-w-50 max-w-full flex flex-col bg-primary-bg rounded-lg overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-50 object-cover"
                  />
                  <div className="flex flex-col gap-1 p-4">
                    <div className="relative flex justify-between gap-4 items-center">
                      <h3>{event.name}</h3>
                      <RsvpStatusMenu eventId={event.id} rsvp={event.rsvp} />
                    </div>
                    <p>{formatDate(event.date)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>

        {/* <div className="flex-2 max-w-full flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg">
          <div className="text-center uppercase font-bold">
            What's happening
          </div> 
          <ActivitiesFeed />
        </div> */}

        {activities.length > 0 && (
          <div className="flex-1 max-w-full flex flex-col gap-4 bg-secondary-bg p-4 rounded-lg">
            <div className="text-center uppercase font-bold">
              Suggested Friends
            </div>
            <UserRecommendations />
          </div>
        )}
      </div>
    </main>
  );
}
