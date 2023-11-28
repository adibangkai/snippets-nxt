interface SnippetEditProps {
  params: {
    id: string;
  };
}
export default function SnippetEdit(props: SnippetEditProps) {
  const id = parseInt(props.params.id);
  return <div>edit snippet {id}</div>;
}
