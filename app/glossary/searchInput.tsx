"use client";

import { Input } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (name: string, value: string) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    if (["", null, undefined].includes(value)) {
      currentParams.delete(name);
    } else {
      currentParams.set(name, value);
    }

    const search = currentParams.toString();
    router.push(
      `${process.env.NEXT_PUBLIC_DOMAIN}/glossary${search ? `?${search}` : ""}`,
    );
  };

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search movements"
        onChange={(e) => updateQuery("q", e.target.value)}
      />
    </div>
  );
}
