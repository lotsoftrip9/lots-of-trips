const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function extractLinkHrefs(markdown: string) {
  return [...new Set([...markdown.matchAll(LINK_PATTERN)].map((match) => match[2]))];
}

export function markdownToPlainText(markdown: string) {
  return markdown
    .replace(LINK_PATTERN, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const looksLikePlan = (markdown: string) =>
  markdown.length > 160 && (/^\s*\d+\.\s/m.test(markdown) || /^#{1,4}\s/m.test(markdown));
