import { db } from "@/db";
import SnippetEditForm from "@/components/SnippetEditForm";

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
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
