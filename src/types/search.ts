export type SearchItemKind = "destination" | "tour" | "experience";

export interface SearchItem {
  id: string;
  kind: SearchItemKind;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  keywords: string;
}

export interface SearchData {
  items: SearchItem[];
  popular: string[];
  experiences: string[];
}
