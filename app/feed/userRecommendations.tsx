import { getUsers } from "@/app/lib/users";
import { InboxIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default async function UserRecommendations() {
  const { users } = await getUsers();
  return (
    <>
      <ul className="flex flex-wrap gap-2 justify-center">
        {users.map(({ handle, firstName, lastName, profilePicture }) => (
          <li key={handle}>
            <Link href={`/profile/${handle}`}>
              <div className="flex flex-col items-center gap-2 bg-primary-bg p-4 rounded-lg">
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt={handle}
                    className="size-10 rounded-full"
                  />
                ) : (
                  <UserIcon className="size-10" />
                )}

                <h3>
                  {firstName} {lastName}
                </h3>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2">
                    <PlusIcon className="size-4" /> Follow
                  </button>
                  <button className="flex items-center gap-2">
                    <InboxIcon className="size-4" /> Message
                  </button>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div>Recommended follows/leads?</div>
    </>
  );
}
