"use client";
import { createSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function NewSnippetPage() {
  const [formState, action] = useFormState(createSnippet, { message: "" });
  const [code, setCode] = useState();
  const handleEditor = (value: string = "") => {
    setCode(value);
  };
  return (
    <form action={action} className="mt-12">
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
        {formState.message ? (
          <div className="bg-red-200 p-2 rounded mt-2 capitalize">
            {formState.message}
          </div>
        ) : null}
        <button className=" rounded p-2 border hover:border-black">
          Create
        </button>
      </div>
    </form>
  );
}
