import { signOut } from "@/auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LogoutButton() {
  async function logout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={logout}>
      <button className="flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <ArrowLeftStartOnRectangleIcon className="w-4" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}
