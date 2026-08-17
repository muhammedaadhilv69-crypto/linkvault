import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Trash2 } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { useUIStore } from "@/stores/ui-store";
import { Badge } from "@/components/ui/badge";
import BookmarkPagination from "@/components/shared/PaginationControls";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Resources() {
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const toggleFavorite = useBookmarkStore((state) => state.toggleFavorite);
  const deleteBookmark = useBookmarkStore((state) => state.removeBookmark)
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
          visibleBookmarks.map((b) => (
            <Card key={b.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{b.title}</CardTitle>
                    <CardDescription>{b.description}</CardDescription>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(b.id)}
                    >
                      <Star
                        className={
                          b.favorite ? "fill-yellow-400 text-yellow-400" : ""
                        }
                      />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="destructive" size="icon">
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>

                          <AlertDialogDescription>
                            Are you sure you want to delete "{b.title}"? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => deleteBookmark(b.id)}
                            variant="destructive"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {b.url}
                </a>
                <div className="flex p-2 gap-2">
                  {b.tags.map((t) => (
                    <Badge variant="default" key={t}>
                      #{t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
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
