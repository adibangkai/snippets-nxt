// import { db } from "@/db";
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // const snippets = await db.snippet.findMany();
  const [snippets, setSnippets] = useState("");
  const [loading, setLoading] = useState(false);
  const snip = [
    {
      id: "1",
      title: "example snippet",
      code: "function test(a,b) {}",
    },
  ];

  if (typeof window !== "undefined") {
    // Perform localStorage action
    if (!localStorage.getItem("snippetsList")) {
      localStorage.setItem("snippetsList", JSON.stringify(snip));
    }
  }
  useEffect(() => {
    setLoading(true);
    setSnippets(JSON.parse(localStorage.getItem("snippetsList") as string));
    setLoading(false);
  }, []);

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
        {loading && <div>loading</div>}
        {snippets && snippets.length !== 0 ? (
          snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/snippets/${snippet.id}/edit`}
              className=" flex justify-between p-2 border rounded my-2 hover:border-gray-900 transition ease-in-out"
            >
              <div>{snippet.title}</div>
              <div>view</div>
            </Link>
          ))
        ) : (
          <div>you have 0 snippets</div>
        )}
      </div>
    </div>
  );
}
