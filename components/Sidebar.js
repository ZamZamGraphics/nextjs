import Link from "next/link";

function Sidebar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/users">Users</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
