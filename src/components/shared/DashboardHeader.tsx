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
    <header className="flex h-16 items-center justify-center px-2 mt-2 gap-2 w-full">
      <SidebarTrigger />
      <nav className="flex flex-1 p-2 gap-4 justify-between border-2 rounded-2xl items-center w-full">
        <div className="flex gap-2">
          <Logo /> LinkVault
        </div>

        <div className="flex gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <InputGroup className="w-96">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search bookmarks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <Button type="submit" variant="ghost">
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Button onClick={openBookmarkDialog}>+ Add</Button>
        </div>

        <Avatar>
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
