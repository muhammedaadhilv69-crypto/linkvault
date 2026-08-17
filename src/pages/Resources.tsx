import { Separator } from "@/components/ui/separator";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { useUIStore } from "@/stores/ui-store";
import BookmarkPagination from "@/components/shared/PaginationControls";
import { useState, useEffect } from "react";
import BookmarkCard from "@/components/shared/BookmarkCard";

function Resources() {
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleBookmarks = bookmarks.slice(start, start + ITEMS_PER_PAGE);
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="p-2">
      <p className="text-3xl">All Bookmarks</p>
      <div className="my-4">
        <Separator />
      </div>
      <div className="flex flex-col gap-4">
        {bookmarks.length > 0 ? (
          visibleBookmarks.map((b) => <BookmarkCard key={b.id} bookmark={b} />)
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bookmark />
              </EmptyMedia>

              <EmptyTitle>No bookmarks yet</EmptyTitle>

              <EmptyDescription>
                Save your first resource to start building your vault.
              </EmptyDescription>
            </EmptyHeader>

            <EmptyContent>
              <Button onClick={openBookmarkDialog}>Add Bookmark</Button>
            </EmptyContent>
          </Empty>
        )}
        <BookmarkPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Resources;
