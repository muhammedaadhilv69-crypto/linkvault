import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/user-store";
import { Separator } from "@/components/ui/separator";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Button } from "@/components/ui/button";
import { Star, Bookmark } from "lucide-react";
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

function Dashboard() {
  const user = useUserStore((state) => state.user);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const tags = [...new Set(bookmarks.flatMap((bookmark) => bookmark.tags))];
  const toggleFavorite = useBookmarkStore((state) => state.toggleFavorite);
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  return (
    <div className="p-4">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 text-sm">
          Your resources, all in one place.
        </p>
      </div>
      <div className="analytics flex gap-6 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Bookmarks</CardDescription>
            <CardTitle>{bookmarks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Favorites</CardDescription>
            <CardTitle>{bookmarks.filter((b) => b.favorite).length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Tags</CardDescription>
            <CardTitle>{tags.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="my-5">
        <Separator />
      </div>
      <div className="recents flex flex-col gap-4">
        <p className="text-2xl">Recently Added</p>
        {bookmarks.length > 0 ? (
          bookmarks
            .slice(-5)
            .reverse()
            .map((b) => (
              <Card key={b.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>{b.title}</CardTitle>
                      <CardDescription>{b.description}</CardDescription>
                    </div>

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
      </div>
    </div>
  );
}

export default Dashboard;
