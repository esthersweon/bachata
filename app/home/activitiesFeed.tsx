import { UserIcon } from "@heroicons/react/24/outline";
import UserRecommendations from "./userRecommendations";

const activityTypesToColors = {
  RSVP: "green",
  User: "hotpink",
  List: "indigo",
};

export const activities = [
  {
    timestamp: "10:00 AM",
    user: "Carlos Reyes",
    userProfilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
    type: "RSVP",
    value: "YES",
    metadata: {
      name: "Joliet",
      date: "Saturday, March 25th",
    },
  },
  {
    timestamp: "10:00 AM",
    user: "Alyssa Smith",
    userProfilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
    type: "RSVP",
    value: "NO",
    metadata: {
      name: "Joliet",
      date: "Saturday, March 25th",
    },
  },
  {
    timestamp: "10:01 AM",
    user: "Anna Lee",
    userProfilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
    type: "User",
    value: "John Doe",
    metadata: { action: "Followed" },
  },
  {
    timestamp: "11:02 AM",
    user: "Pedro Rodriguez",
    userProfilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
    type: "List",
    value: "Sensual moves to practice",
    metadata: {
      action: "Created",
    },
  },
  {
    timestamp: "12:03 PM",
    user: "Pedro Rodriguez",
    userProfilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
    type: "List",
    value: "Social moves to learn",
    metadata: {
      action: "Edited",
    },
  },
];

export default function ActivitiesFeed() {
  return activities.length === 0 ? (
    <>
      <p>Follow people to see their activity! 💃</p>
      <UserRecommendations />
    </>
  ) : (
    <ul className="flex flex-col gap-2">
      {activities.map((activity) => (
        <li
          key={`${activity.timestamp}-${activity.user}`}
          className="flex flex-col gap-2 bg-primary-bg p-4 rounded-lg"
        >
          <div className="flex items-center gap-2">
            {activity.userProfilePicture ? (
              <img
                src={activity.userProfilePicture}
                alt={activity.user}
                className="size-6 rounded-full"
              />
            ) : (
              <UserIcon className="size-6" />
            )}
            {activity.user}{" "}
            <span className="text-gray-400">{activity.timestamp}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="px-2 py-1 rounded-lg"
              style={{
                backgroundColor:
                  activityTypesToColors[
                    activity.type as keyof typeof activityTypesToColors
                  ],
              }}
            >
              {activity.metadata?.action ? `${activity.metadata.action} ` : ""}
              {activity.type}
            </div>{" "}
            "{activity.value}"{" "}
            {activity.metadata?.name ? `to ${activity.metadata.name}` : ""}{" "}
            {activity.metadata?.date ? `on ${activity.metadata.date}` : ""}
          </div>
        </li>
      ))}
    </ul>
  );
}
