import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { useBookmarkStore } from "@/stores/bookmark-store";
import type { Bookmark } from "@/types/bookmark";

function BookmarkCard({bookmark}: {bookmark: Bookmark}) {
  const toggleFavorite = useBookmarkStore((state) => state.toggleFavorite);
  const deleteBookmark = useBookmarkStore((state) => state.removeBookmark);
  const b = bookmark;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="wrap-break-word">{b.title}</CardTitle>
            <CardDescription>{b.description}</CardDescription>
          </div>
          <div className="flex shrink-0 gap-1 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(b.id)}
            >
              <Star
                className={b.favorite ? "fill-yellow-400 text-yellow-400" : ""}
              />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" size="icon" />}>
                  <Trash2 />
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>

                  <AlertDialogDescription>
                    Are you sure you want to delete "{b.title}"? This action
                    cannot be undone.
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
          className="break-all hover:underline"
        >
          {b.url}
        </a>
        <div className="flex flex-wrap p-2 gap-2">
          {b.tags.map((t: string) => (
            <Badge variant="default" key={t}>
              #{t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default BookmarkCard;
