import { InboxIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";

const users = [
  {
    name: "Jane Kim",
    profilePicture:
      "https://www.earwolf.com/wp-content/uploads/2019/12/Jane-Kim.png",
  },
  {
    name: "Mary Smith",
    profilePicture:
      "https://m.media-amazon.com/images/S/amzn-author-media-prod/cbtf70ml1encdjg9p8bo25s434.jpg",
  },
  {
    name: "Peter Parker",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2S4Pd9frhGQ-dbuc99t82f3MuXWF4sdAUdA&s",
  },
  {
    name: "Liam Neeson",
    profilePicture:
      "https://m.media-amazon.com/images/M/MV5BMjA1MTQ3NzU1MV5BMl5BanBnXkFtZTgwMDE3Mjg0MzE@._V1_FMjpg_UX1000_.jpg",
  },
  {
    name: "Terry Gross",
    profilePicture:
      "https://www.neh.gov/sites/default/files/styles/1000x1000_square/public/2018-06/2016_04_Fall_Medalists2015_06.jpg?h=90ebecbb&itok=bABaXy7Z",
  },
];

export default function UserRecommendations() {
  return (
    <>
      <ul className="flex flex-wrap gap-2 justify-center">
        {users.map(({ name, profilePicture }) => (
          <li
            key={name}
            className="flex flex-col items-center gap-2 bg-primary-bg p-4 rounded-lg"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={name}
                className="size-10 rounded-full"
              />
            ) : (
              <UserIcon className="size-10" />
            )}

            <h3>{name}</h3>

            <div className="flex gap-2">
              <button className="flex items-center gap-2">
                <PlusIcon className="size-4" /> Follow
              </button>
              <button className="flex items-center gap-2">
                <InboxIcon className="size-4" /> Message
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>Recommended follows/leads?</div>
    </>
  );
}
