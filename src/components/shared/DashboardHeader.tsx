import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useUIStore } from "@/stores/ui-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ avatarUrl }: { avatarUrl: string }) {
  const navigate = useNavigate();
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };
  return (
    <header className="flex min-h-16 w-full items-center gap-2 px-2 sm:px-4">
      <SidebarTrigger />
      <nav className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-2xl border-2 p-2 sm:gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <Logo />
          <span className="hidden sm:inline">LinkVault</span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="min-w-0 flex-1 sm:flex-none"
          >
            <InputGroup className="w-full sm:w-72 lg:w-96">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search bookmarks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Button
                  type="submit"
                  variant="ghost"
                  className="hidden sm:inline-flex"
                >
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Button
            onClick={openBookmarkDialog}
            className="hidden sm:inline-flex"
          >
            + Add
          </Button>
        </div>

        <Avatar className="shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
export default DashboardHeader;
