"use client";

import Link from "next/link";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SnippetEditProps {
  params: {
    id: string;
  };
}
interface SnippetProps {
  id?: string;
  title: string;
  code: string;
}

export default function SnippetEdit(props: SnippetEditProps) {
  const id = props.params.id as string;
  const [code, setCode] = useState("");
  const [snippet, setSnippet] = useState<SnippetProps | undefined>();
  const router = useRouter();
  const handleEditor = (value: string = "") => {
    setCode(value);
  };

  useEffect(() => {
    const snip = localStorage.getItem("snippetsList")
      ? JSON.parse(localStorage.getItem("snippetsList") as string).find(
          (x: SnippetProps) => x.id === id
        )
      : null;
    setSnippet(snip);
  }, []);

  function editSnippet() {
    let entries = JSON.parse(localStorage.getItem("snippetsList") as string);
    const index = entries.findIndex(
      (item: SnippetProps) => item.id === snippet?.id
    );
    const updated = [
      ...entries.slice(0, index),
      Object.assign({}, entries[index], { id: snippet?.id, code }),
      ...entries.slice(index + 1),
    ];
    localStorage.setItem("snippetsList", JSON.stringify(updated));
  }
  return (
    <div className="mt-12">
      <Link href={"/"} className="font-bold hover:opacity-50">
        &#8249;back
      </Link>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-4">
          <form>
            <button className="border rounded px-2 py-1 hover:opacity-40">
              Delete
            </button>
          </form>
        </div>
      </div>
      {/* <SnippetEditForm snippet={snippet} /> */}
      <div>
        <Editor
          height="40vh"
          theme="vs-dark"
          language="javascript"
          width="100%"
          defaultValue={snippet?.code}
          options={{ minimap: { enabled: false } }}
          onChange={handleEditor}
        />
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            editSnippet();
            router.push("/");
          }}
        >
          <button type="submit" className="p-2 border rounded hover:opacity-60">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
