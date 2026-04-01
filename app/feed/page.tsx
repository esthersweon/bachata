import { getEvents } from "@/app/lib/events";
import { Suspense } from "react";
import { formatDate } from "../helpers";
import ActivitiesFeed, { activities } from "./activitiesFeed";
import UserRecommendations from "./userRecommendations";

const rsvpToLabel = {
  true: { label: "Attending", color: "green" },
  false: { label: "Not attending", color: "red" },
  null: { label: "Undecided", color: "gray" },
};

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-4 bg-secondary-bg p-4 rounded-lg">
          <h2>Upcoming events</h2>
          <Suspense fallback={<div>Loading events...</div>}>
            <ul className="flex flex-wrap gap-2">
              {events.map((event) => (
                <li
                  key={event.name}
                  className="basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col bg-primary-bg rounded-lg overflow-hidden"
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
                            rsvpToLabel[
                              (event.rsvp ?? "null") as keyof typeof rsvpToLabel
                            ].color,
                        }}
                        className="px-2 py-1 rounded-full"
                      >
                        {
                          rsvpToLabel[
                            (event.rsvp ?? "null") as keyof typeof rsvpToLabel
                          ].label
                        }
                      </div>
                    </div>
                    <p>{formatDate(event.date)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>

        <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg">
          <ActivitiesFeed />
        </div>

        {activities.length > 0 && (
          <div className="flex-1 basis-[calc(1/2*100%-0.5rem)] max-w-full flex flex-col gap-2 bg-secondary-bg p-4 rounded-lg">
            <UserRecommendations />
          </div>
        )}
      </div>
    </main>
  );
}
