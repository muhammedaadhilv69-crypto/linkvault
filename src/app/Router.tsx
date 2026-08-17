import { Routes, Route } from "react-router-dom";
import E404 from "@/pages/E404";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import Settings from "@/pages/Settings";
import Resources from "@/pages/Resources"
import Favorites from "@/pages/Favorites";

export default function Router() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />}/>
        <Route path="/search" />
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/folders" />
        {/* <Route path="/folders/:folderId" /> */}
        <Route path="/tags" />
        {/* <Route path="/tags/:tag" /> */}
        <Route path="/settings" element={<Settings />}/>
      </Route>
        <Route path="*" element={<E404 />} />
    </Routes>
  );
}
