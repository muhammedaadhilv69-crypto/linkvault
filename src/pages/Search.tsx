import { useSearchParams } from "react-router-dom";
import { searchLinks } from "@/features/search/services/Search";
import { useBookmarkStore } from "@/stores/bookmark-store";
import BookmarkCard from "@/components/shared/BookmarkCard";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Bookmark } from "lucide-react";
import PaginationControls from "@/components/shared/PaginationControls"
import { useEffect, useState } from "react";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const links = useBookmarkStore((state) => state.bookmarks);
  const results = searchLinks(links, query);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const visibleResults = results.slice(start, start + ITEMS_PER_PAGE);
    useEffect(() => {
      setPage(1);
    }, [query]);
    useEffect(() => {
      if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
      }
    }, [page, totalPages]);

  return (
    <div className="p-4">
      <h1 className="text-xl">{query ? `Search results for "${query}"` : "Search something to get started"}</h1>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4">
        {visibleResults.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bookmark />
              </EmptyMedia>

              <EmptyTitle>{query ? `No results for "${query}" yet` : "Start Searching" }</EmptyTitle>

              <EmptyDescription>
                {query ? "Try searching for something else." : "Search your bookmarks to find what you're looking for."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          visibleResults.map((r) => <BookmarkCard key={r.id} bookmark={r} />)
        )}
      </div>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Search;
