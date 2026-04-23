import { getEvents } from "@/app/lib/events";
import { getLists } from "@/app/lib/lists";
import { CakeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import VideosCarousel from "../movements/[id]/videosCarousel";
import MyBadges from "./myBadges";
import MyProgressPieChart from "./myProgressPieChart";
import ProfileEventsSection from "./profileEventsSection";
import ProfileListsSection from "./profileListsSection";

export default async function Dashboard() {
  const lists = await getLists();
  const events = await getEvents();

  return (
    <main className="flex flex-col gap-4">
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
              <div className="text-xs bg-secondary-bg px-2 py-1 rounded-full capitalize">
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
              <div>Dancing since Oct 2025</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <MyBadges />

          <div className="flex flex-wrap gap-2 w-full items-stretch">
            <div className="flex flex-col gap-2 basis-[calc(1/3*100%-0.5rem)] max-w-full">
              <div className="flex flex-col w-full bg-secondary-bg p-4 rounded-lg">
                <div className="text-center text-sm uppercase font-bold">
                  My Progress
                </div>
                <MyProgressPieChart />
              </div>
              <ProfileEventsSection events={events} allowEditing />
              <ProfileListsSection
                title="My Lists"
                lists={lists}
                allowEditing
              />
            </div>

            <div className="flex flex-col gap-4 basis-[calc(2/3*100%-0.5rem)] bg-secondary-bg p-4 rounded-lg">
              <div className="text-center uppercase font-bold text-sm">
                My Videos
              </div>
              <VideosCarousel />
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
