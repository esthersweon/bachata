"use client";

import { CakeIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DanceEvent, List as ListType, User } from "../../types";
import MyProgress from "../myProgress";
import ProfileEventsSection from "../profileEventsSection";
import ProfileListsSection from "../profileListsSection";

export default function ProfilePage() {
  const { handle } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [lists, setLists] = useState<ListType[]>([]);
  const [events, setEvents] = useState<DanceEvent[]>([]);

  useEffect(() => {
    if (!handle) return;

    void Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/${handle}`).then(
        (r) => r.json() as Promise<{ user: User }>,
      ),
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/lists`).then(
        (r) => r.json() as Promise<ListType[]>,
      ),
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/events`).then(
        (r) => r.json() as Promise<DanceEvent[]>,
      ),
    ]).then(([{ user: fetchedUser }, nextLists, nextEvents]) => {
      setUser(fetchedUser);
      setLists(nextLists);
      setEvents(nextEvents);
    });
  }, [handle]);

  if (!user || !handle) return <div>User not found</div>;

  return (
    <main className="flex flex-col gap-4">
      <Suspense fallback={<div>Loading profile...</div>}>
        <div className="flex justify-center items-center gap-4">
          <img
            src={user?.profilePicture ?? ""}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="size-30 rounded-full"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
              <div className="text-xs bg-secondary-bg px-2 py-1 rounded-full">
                Follow
              </div>
            </div>

            <div className="flex gap-2 text-sm">
              <div>
                <span className="cursor-pointer font-bold">87</span> Followers
              </div>
              <div>
                <span className="cursor-pointer font-bold">124</span> Following
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-primary-text/80">
              <CakeIcon className="size-3" />
              <div>Dancing since Feb 2026</div>
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
          {/* <MyBadges /> */}

          <div className="flex flex-wrap gap-2 w-full items-start">
            <div className="flex flex-col gap-2 flex-1 basis-[calc(1/3*100%-0.5rem)] max-w-full">
              <MyProgress />
            </div>

            <ProfileListsSection lists={lists} />

            <ProfileEventsSection events={events} />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
