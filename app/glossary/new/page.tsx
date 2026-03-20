import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <Link href="/glossary">
            <button>Back to Glossary</button>
          </Link>
          <h1>Add to Glossary</h1>
        </div>
      </main>
    </>
  );
}
