"use client";
import { createSnippet } from "@/actions";
import { useFormState } from "react-dom";

export default function NewSnippetPage() {
  const [formState, action] = useFormState(createSnippet, { message: "" });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create Snippet</h3>
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
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="bg-red-200 p-2 rounded mt-2 capitalize">
            {formState.message}
          </div>
        ) : null}
        <button className=" rounded p-2 bg-blue-200">Create</button>
      </div>
    </form>
  );
}
