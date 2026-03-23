"use client";

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
    router.push(`http://localhost:3000/glossary${search ? `?${search}` : ""}`);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search"
        value={searchParams.get("q") ?? ""}
        onChange={(e) => updateQuery("q", e.target.value)}
      />
    </div>
  );
}
