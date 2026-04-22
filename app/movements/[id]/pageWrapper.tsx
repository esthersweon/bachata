import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <Link
        href="/movements"
        className="inline-flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-primary-text transition-colors w-fit"
      >
        <ArrowLeftIcon className="size-4 shrink-0" />
        Back to movements
      </Link>
      {children}
    </main>
  );
}
