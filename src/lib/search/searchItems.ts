import type { SearchItem, SearchItemKind } from "@/types/search";

export const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const SEARCH_KIND_LABEL: Record<SearchItemKind, string> = {
  destination: "Destination",
  tour: "Journey",
  experience: "Way to travel",
};

const KIND_WEIGHT: Record<SearchItemKind, number> = {
  destination: 3,
  tour: 2,
  experience: 1,
};

function scoreTerm(term: string, title: string, keywords: string) {
  if (title.startsWith(term)) return 100;
  if (title.includes(` ${term}`)) return 70;
  if (title.includes(term)) return 45;
  if (keywords.startsWith(term) || keywords.includes(` ${term}`)) return 25;
  if (keywords.includes(term)) return 10;
  return 0;
}

function scoreItem(item: SearchItem, terms: string[]) {
  const title = normalizeSearchText(item.title);
  let total = 0;
  for (const term of terms) {
    const score = scoreTerm(term, title, item.keywords);
    if (!score) return 0;
    total += score;
  }
  return total + KIND_WEIGHT[item.kind];
}

export function searchItems(items: SearchItem[], query: string, limit = 8) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  if (!terms.length) return [];

  return items
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function splitHighlight(text: string, query: string) {
  const needle = query.trim().toLowerCase();
  const index = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (index < 0) return { before: text, match: "", after: "" };
  return {
    before: text.slice(0, index),
    match: text.slice(index, index + needle.length),
    after: text.slice(index + needle.length),
  };
}
