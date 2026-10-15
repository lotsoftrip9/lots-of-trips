import { splitHighlight } from "@/lib/search/searchItems";

export function HighlightedText({ text, query }: { text: string; query: string }) {
  const { before, match, after } = splitHighlight(text, query);

  return (
    <>
      {before}
      {match && <mark className="bg-transparent text-accent">{match}</mark>}
      {after}
    </>
  );
}
