import { signOut } from "@/auth";
import { Button } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LogoutButton() {
  async function logout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={logout}>
      <Button
        type="submit"
        className="flex items-center justify-center gap-2 bg-transparent! p-0! cursor-pointer!"
      >
        <ArrowLeftStartOnRectangleIcon className="w-4" />
        <div className="hidden md:block">Logout</div>
      </Button>
    </form>
  );
}
