import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link
          href={"/snippets/new"}
          className="border rounded px-2 py-1 hover:opacity-40"
        >
          New
        </Link>
      </div>
      <div className="gap-2">
        {snippets.map((snippet) => (
          <Link
            key={snippet.id}
            href={`/snippets/${snippet.id}`}
            className=" flex justify-between p-2 border rounded my-2 hover:border-gray-900 transition ease-in-out"
          >
            <div>{snippet.title}</div>
            <div>view</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
