"use client";

import { Editor } from "@monaco-editor/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewSnippetPage() {
  // const [formState, action] = useFormState(createSnippet, { message: "" });
  const router = useRouter();
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  let id = uid();
  function addSnippet() {
    let entries = [];

    if (localStorage.getItem("snippetsList")) {
      entries = JSON.parse(localStorage.getItem("snippetsList") as string);
      entries.push({ id, title, code });
      localStorage.setItem("snippetsList", JSON.stringify(entries));
    } else {
      entries.push({ id, title, code });
      localStorage.setItem(
        "snippetsList",
        JSON.stringify([{ id, title, code }])
      );
    }
  }
  const handleEditor = (value: string = "") => {
    setCode(value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addSnippet();
        router.push("/");
      }}
      className="mt-12"
    >
      <Link href={"/"}>
        <h3 className="font-bold hover:opacity-50 mb-4">&#8249;back</h3>
      </Link>{" "}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <Editor
            height="40vh"
            width="100%"
            theme="vs-dark"
            language="javascript"
            options={{ minimap: { enabled: false } }}
            onChange={handleEditor}
          />
          <input type="hidden" name="code" value={code} />
        </div>
        <button className=" rounded p-2 border hover:border-black">
          Create
        </button>
      </div>
    </form>
  );
}
