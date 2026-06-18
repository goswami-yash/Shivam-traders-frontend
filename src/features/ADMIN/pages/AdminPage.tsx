import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

const AdminPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] dark:bg-slate-950 overflow-hidden bg-slate-50">
      <SidebarAdmin />

      <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;