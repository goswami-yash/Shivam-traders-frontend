import { NavLink } from "react-router-dom";
import { sidebarMenus } from "./sidebarConfig";

const SidebarAdmin = () => {
  return (
    <aside className="w-72 h-[calc(100vh-64px)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 sticky top-16 overflow-y-auto">

      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Transport ERP
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Admin Dashboard
        </p>
      </div>

      <div className="p-3">
        {sidebarMenus.map((group) => (
          <div key={group.title} className="mb-5">
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {group.title}
            </h3>

            <div className="space-y-1">
              {group.items.map((menu) => {
                const Icon = menu.icon;

                return (
                  <NavLink
                    key={menu.path}
                    to={menu.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    <Icon size={20} />

                    <span className="font-medium">
                      {menu.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarAdmin;