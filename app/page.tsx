export default function Home() {
  return (
    <>
      <main>
        <div className="flex gap-4">
          <div className="flex-1 bg-gray-800 p-4 rounded-lg">
            <p>Follow more people to see more activity</p>
            <h2>My activity feed:</h2>
            <ul>
              <li>RSVPs for people I follow</li>
              <li>Lists created by people I follow</li>
            </ul>
          </div>
          <div className="flex-3 flex flex-col gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2>Upcoming events</h2>
              <ul>
                <li>
                  Joliet: 3/25
                  <br />
                  RSVP'ed YES (Attended by John, Jane, and Mary)
                </li>
                <li>
                  Victorian: 4/15
                  <br />
                  RSVP'ed NO (Attended by Mary)
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h2>People you may know:</h2>
              <ul>
                <li>John Doe</li>
                <li>Jane Doe</li>
                <li>Mary Smith</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
