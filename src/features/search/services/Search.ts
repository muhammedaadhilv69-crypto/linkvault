import type { Bookmark } from "@/types/bookmark";

export function searchLinks(links: Bookmark[], query: string): Bookmark[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return links.filter((link) =>
    link.title.trim().toLowerCase().includes(normalizedQuery),
  );
}
