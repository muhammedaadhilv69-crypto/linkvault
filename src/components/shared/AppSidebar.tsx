import {
  Bookmark,
  BookOpen,
  Folder,
  Home,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { useUIStore } from "@/stores/ui-store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainNavigation = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Star,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
];

const libraryNavigation = [
  {
    title: "Folders",
    url: "/folders",
    icon: Folder,
  },
  {
    title: "Tags",
    url: "/tags",
    icon: Tag,
  },
];

export function AppSidebar() {
  const openBookmarkDialog = useUIStore((state) => state.openAddBookmark);
  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <NavLink
                  to="/"
                  className="flex items-center gap-2 justify-center"
                />
              }
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bookmark className="size-4" />
              </div>

              <span className="text-base font-semibold">LinkVault</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="w-full"
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Library */}
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {libraryNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="w-full"
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Create */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={openBookmarkDialog}>
                  <Plus />
                  <span>New Bookmark</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
              <NavLink to="/settings" end className="w-full">
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
