import { getOtherUsers } from "@/app/lib/users";
import { auth } from "@/auth";
import { HeartIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function UserRecommendations() {
  const session = await auth();
  const userId = session?.user?.id ?? "";
  const { users } = await getOtherUsers(userId);

  return (
    <>
      <ul className="flex flex-wrap gap-2 justify-center">
        {users.map(({ handle, firstName, lastName, profilePicture }) => (
          <li key={handle}>
            <Link href={`/profile/${handle}`}>
              <div className="flex flex-col items-center gap-2 bg-tertiary-bg p-4 rounded-lg">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={handle}
                    className="size-10 rounded-full"
                  />
                ) : (
                  <UserIcon className="size-10" />
                )}

                <div className="text-sm">
                  {firstName} {lastName}
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-1">
                    <HeartIcon className="size-4" /> Friend
                  </button>
                  <button className="flex items-center gap-1">
                    <InboxIcon className="size-4" /> Message
                  </button>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
