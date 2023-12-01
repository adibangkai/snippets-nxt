"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: {
    id: number;
    title: string;
    code: string;
  };
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditor = (value: string = "") => {
    setCode(value);
  };

  function editSnippet() {
    let entries = [];

    entries = JSON.parse(localStorage.getItem("snippetsList") as string);
    entries.push({ snippet.id , snippet.title, code });
    localStorage.setItem("snippetsList", JSON.stringify(entries));
  }
  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditor}
      />
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          editSnippet();
        }}
      >
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
