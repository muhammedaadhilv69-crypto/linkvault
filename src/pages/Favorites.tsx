import { Separator } from "@/components/ui/separator";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useState } from "react";
import BookmarkPagination from "@/components/shared/PaginationControls";
import { Star } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import BookmarkCard from "@/components/shared/BookmarkCard";

function Favorites() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const favorites = bookmarks.filter((b) => b.favorite);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleBookmarks = favorites.slice(start, start + ITEMS_PER_PAGE);
  return (
    <div className="p-2">
      <p className="text-3xl">Favorites</p>
      <div className="my-4">
        <Separator />
      </div>
      <div className="flex flex-col gap-4">
        {favorites.length > 0 ? (
          visibleBookmarks.map((b) => <BookmarkCard key={b.id} bookmark={b} />)
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Star />
              </EmptyMedia>

              <EmptyTitle>No favorites yet</EmptyTitle>

              <EmptyDescription>
                Favorite a bookmark to show it here!
              </EmptyDescription>
            </EmptyHeader>
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

export default Favorites;
