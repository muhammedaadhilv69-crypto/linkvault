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

function DashboardHeader({ avatarUrl }: { avatarUrl: string }) {
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  return (
    <header className="flex h-16 items-center justify-center px-2 mt-2 gap-2 w-full">
      <SidebarTrigger />
      <nav className="flex flex-1 p-2 gap-4 justify-between border-2 rounded-2xl items-center w-full">
        <div className="flex gap-2">
          <Logo /> LinkVault
        </div>

        <div className="flex gap-4">
          <InputGroup className="w-96">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search bookmarks..." />
          </InputGroup>

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
