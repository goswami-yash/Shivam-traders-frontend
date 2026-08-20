import  { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/features/AUTH/context/AuthContext";
import { useTheme } from "@/shared/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  LogIn,
} from "lucide-react";
import { navLinks } from "@/shared/constants/NavConst";

const Layout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen flex flex-col bg-[#F5FBDA] dark:bg-[#120311] transition-colors duration-300 overflow-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-[#D9EFBD] dark:border-[#450C3F] bg-white dark:bg-[#2A0727] shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-6 sm:gap-8">
            <h1
              className="text-xl sm:text-2xl font-black text-[#450C3F] dark:text-[#B9D175] tracking-tight cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <span className="bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] px-2 py-0.5 rounded-full text-lg">ST</span>
              Shivam Traders
            </h1>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#B9D175] text-[#450C3F] shadow-sm"
                        : "text-[#450C3F]/80 dark:text-[#D9EFBD] hover:bg-[#D9EFBD]/40 dark:hover:bg-[#450C3F]/50"
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline-block text-sm font-medium text-[#450C3F] dark:text-[#D9EFBD] bg-[#D9EFBD]/30 dark:bg-[#450C3F]/50 px-3 py-1.5 rounded-full border border-[#D9EFBD] dark:border-[#450C3F]">
                👋 {user.name}
              </span>
            )}

            {/* THEME TOGGLE */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="rounded-full border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#D9EFBD]/40 dark:hover:bg-[#450C3F]"
              aria-label="Toggle Theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun size={18} className="text-[#B9D175]" /> : <Moon size={18} />}
              </motion.div>
            </Button>

            {/* AUTH BUTTON */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex items-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 transition shadow-sm"
              >
                <LogIn size={16} />
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-2 rounded-xl transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              className="lg:hidden p-2 rounded-xl border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#D9EFBD]/30 dark:hover:bg-[#450C3F]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV DROPDOWN */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-[#D9EFBD] dark:border-[#450C3F] bg-white dark:bg-[#2A0727] px-4 py-4 space-y-1.5 shadow-xl overflow-hidden"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition ${
                      active
                        ? "bg-[#B9D175] text-[#450C3F]"
                        : "text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#F5FBDA] dark:hover:bg-[#450C3F]/50"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[#D9EFBD] dark:border-[#450C3F] flex justify-between items-center">
                {!user ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold py-2.5 rounded-xl text-sm"
                  >
                    <LogIn size={16} />
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                      navigate("/login");
                    }}
                    className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 font-semibold py-2.5 rounded-xl text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN BODY AREA */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900 dark:text-[#F5FBDA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;