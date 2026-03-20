export default function Profile() {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <h1>Esther Weon</h1>
        <p>Dance anniversary: 3/25</p>
        <ul>
          <li>Followers: 100</li>
          <li>Following: 100</li>
        </ul>
        <div className="flex gap-4">
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
            </ul>
            <button>Create new list</button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-gray-800 p-4 rounded-lg flex-1">
            <h2>Partner requests:</h2>
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
