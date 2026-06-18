import React, { useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/features/AUTH/context/AuthContext";
import { useTheme } from "@/shared/context/ThemeContext";
import { motion } from "framer-motion";

import {
  Sun,
  Moon,
  Menu,
  Users,
  Truck,
  Package,
  UserRound,
  Building2,
  CarFront,
} from "lucide-react";


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4 sm:gap-8">
            <h1
              className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Shivam Traders
            </h1>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-6 text-sm text-gray-600 dark:text-gray-300">
              <Link
                to="/"
                className="hover:text-black dark:hover:text-white transition"
              >
                Dashboard
              </Link>

              <Link
                to="/create-order"
                className="hover:text-black dark:hover:text-white transition"
              >
                Create Order
              </Link>

              <Link
                to="/Order-list"
                className="hover:text-black dark:hover:text-white transition"
              >
                Order List
              </Link>

              <Link
                to="/user-manage"
                className="hover:text-black dark:hover:text-white transition"
              >
                User Management
              </Link>

              <Link
                to="/admin-action"
                className="hover:text-black dark:hover:text-white transition"
              >
                Admin
              </Link>
              <Link
                to="/about"
                className="hover:text-black dark:hover:text-white transition"
              >
                About
              </Link>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
                👋 {user.name}
              </span>
            )}

            {/* THEME TOGGLE */}
            <div className="hidden md:flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 bg-gray-50 dark:bg-gray-700 shadow-sm">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun size={16} />
                  ) : (
                    <Moon size={16} />
                  )}
                </motion.div>
              </Button>
            </div>

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            )}

            {/* MOBILE MENU */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 space-y-2">
            <Link
              to="/create-order"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Create Order
            </Link>

            <Link
              to="/Order-list"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Order List
            </Link>

            <Link
              to="/users"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Master
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        )}
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;