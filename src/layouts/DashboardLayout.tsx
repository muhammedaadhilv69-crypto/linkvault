import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useUserStore } from "@/stores/user-store";
import AddBookmarkDialog from "@/components/shared/AddBookmarkDialog";

export default function DashboardLayout() {
  const {avatarUrl} = useUserStore((state) => state.user)
  

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader avatarUrl={avatarUrl} />

        <main className="flex-1 p-1">
          <Outlet />
        </main>

        <AddBookmarkDialog />
      </SidebarInset>
    </SidebarProvider>
  );
}
