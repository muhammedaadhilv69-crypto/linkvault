import { Separator } from "@/components/ui/separator";
import { useBookmarkStore } from "@/stores/bookmark-store";
import {Card, CardTitle, CardHeader, CardDescription, CardContent} from "@/components/ui/card"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import BookmarkPagination from "@/components/shared/PaginationControls";
import { Star, Bookmark, Trash2 } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

function Favorites() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const favorites = bookmarks.filter(b => b.favorite)
  const toggleFavorite = useBookmarkStore((state) => state.toggleFavorite);
  const deleteBookmark = useBookmarkStore((state) => state.removeBookmark)
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
