import { db } from "@/db";
import SnippetEditForm from "@/components/SnippetEditForm";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface SnippetEditProps {
  params: {
    id: string;
  };
}
export default async function SnippetEdit(props: SnippetEditProps) {
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: { id },
  });
  return (
    <div className="mt-12">
      <Link href={"/"} className="font-bold hover:opacity-50">
        &#8249;back
      </Link>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border rounded px-2 py-1 hover:opacity-40"
          >
            Edit
          </Link>
          <form action={deleteSnippet.bind(null, snippet.id)}>
            <button className="border rounded px-2 py-1 hover:opacity-40">
              Delete
            </button>
          </form>
        </div>
      </div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
