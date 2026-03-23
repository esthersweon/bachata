const events = [
  {
    name: "Joliet",
    date: "Saturday, March 25th",
    rsvp: "YES",
    attendees: ["John", "Jane", "Mary"],
  },
  {
    name: "Victorian",
    date: "Sunday, April 15th",
    rsvp: "NO",
    attendees: ["Mary"],
  },
  {
    name: "Crown",
    date: "Friday, May 15th",
    rsvp: "UNDECIDED",
    attendees: ["Mary"],
  },
];

const rsvpToLabel = {
  YES: { label: "Attending", color: "green" },
  NO: { label: "Not attending", color: "red" },
  UNDECIDED: { label: "Undecided", color: "gray" },
};

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        <div className="flex-2 min-w-[50%] flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
          <h2>Upcoming events</h2>
          <ul className="flex flex-col gap-2">
            {events.map((event) => (
              <li key={event.name} className="bg-black p-2 rounded-lg">
                <div className="flex flex-wrap justify-between items-center">
                  <h3>{event.name}</h3>

                  <div
                    style={{
                      backgroundColor:
                        rsvpToLabel[event.rsvp as keyof typeof rsvpToLabel]
                          .color,
                    }}
                    className="px-2 py-1 rounded-full"
                  >
                    {rsvpToLabel[event.rsvp as keyof typeof rsvpToLabel].label}
                  </div>
                </div>
                <p>{event.date}</p>
                <p>Friends attending: {event.attendees.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
          <p>Follow more people to see more activity</p>
          <h2 className="text-nowrap">My activity feed:</h2>
          <ul>
            <li>RSVPs for people I follow</li>
            <li>Lists created by people I follow</li>
          </ul>
        </div>

        <div className="flex-2 min-w-[50%] flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-nowrap">Past events</h2>
          <ul className="flex flex-col gap-2">
            <li>Joliet: 3/25</li>
            <li>Victorian: 4/15</li>
            <li>Crown: 5/15</li>
          </ul>
        </div>

        <div className="flex-1 flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-nowrap">People you may know:</h2>
          <ul>
            <li>John Doe</li>
            <li>Jane Doe</li>
            <li>Mary Smith</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
