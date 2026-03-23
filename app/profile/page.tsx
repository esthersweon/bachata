export default function Profile() {
  return (
    <main>
      <div className="flex flex-wrap justify-between items-center">
        <h1>Esther Weon</h1>
        <div className="bg-gray-800 p-4 rounded-full">Follow</div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Dance anniversary: 3/25</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div>Followers</div>
            <div>100</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Following</div>
            <div>100</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>My events:</h2>
            <ul>
              <li>Joliet: 3/25</li>
              <li>Victorian: 4/15</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>My lists:</h2>
            <ul>
              <li>Basic</li>
              <li>Sensual</li>
              <li>To Learn / Practice</li>
            </ul>
            <button>Create new list</button>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>My combos:</h2>
            <ul>
              <li>Basic Combo = Basic + Right turn + Basic</li>
              <li>
                Sensual Combo to Practice = Basic + Right turn + Contra turn +
                Sensual Basic
              </li>
            </ul>
            <button>Create new list</button>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>Recommended partners:</h2>
            <ul>
              <li>John Doe</li>
              <li>Jane Doe</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>Badges</h2>
            <ul>
              <li>Basic</li>
              <li>Sensual</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>Settings</h2>
            <ul>
              <li>Notifications</li>
              <li>Privacy</li>
              <li>Language</li>
              <li>Theme</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
