import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/AUTH/context/AuthContext";
import { useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4 sm:gap-8">
            <h1
              className="text-lg sm:text-xl font-bold text-blue-600 cursor-pointer"
             // onClick={() => navigate("/")}
            >
              Shivam Traders
            </h1>
{/* 
         

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link to="/" className="hover:text-black transition">
                Home
              </Link>
              <Link to="/create-order" className="hover:text-black transition">
                Create Order
              </Link>
              <Link to="/Order-list" className="hover:text-black transition">
                Order List
              </Link>
              <Link to="/about" className="hover:text-black transition">
                About
              </Link>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* USER */}
            {user && (
              <span className="hidden sm:block text-sm text-gray-700">
                👋 {user.name}
              </span>
            )}

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
            <Link
              to="/create-order"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 hover:text-black"
            >
              Create Order
            </Link>
            <Link
              to="/Order-list"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 hover:text-black"
            >
              Order list
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-700 hover:text-black"
            >
              About
            </Link>

            {user && (
              <div className="pt-2 border-t text-sm text-gray-600">
                👤 {user.name}
              </div>
            )}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 px-4 sm:px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;