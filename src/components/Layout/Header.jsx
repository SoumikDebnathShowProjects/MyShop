import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  ////////////////////////////////////////
  // Logout Handler
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  ////////////////////////////////////////
  // Toggle Handlers
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  ////////////////////////////////////////
  // JSX Return: Modern Glassmorphism Navbar
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent hidden sm:block">
                MyShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center ml-8">
            
            {/* Home Link */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
            >
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 font-medium transition-all duration-300"
                onClick={toggleCategories}
                aria-expanded={isCategoriesOpen}
              >
                <span>Categories</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Categories Dropdown Menu */}
              <div
                className={`absolute top-full left-0 transform mt-1 w-56 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 transition-all duration-300 ${
                  isCategoriesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-1">
                  <Link
                    className="block px-3 py-2 text-sm text-white/90 hover:bg-white/20 rounded-lg transition-all duration-200 font-medium"
                    to="/categories"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>📁</span>
                      <span>All Categories</span>
                    </span>
                  </Link>
                  {categories?.map((c, index) => (
                    <Link
                      key={index}
                      className="block px-3 py-2 text-sm text-white/90 hover:bg-white/20 rounded-lg transition-all duration-200"
                      to={`/category/${c.slug}`}
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-md mx-4">
              <SearchInput />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Authentication Links */}
            {!auth?.user ? (
              <div className="hidden lg:flex items-center space-x-2">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="hidden lg:block relative">
                <button
                  className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                    {auth?.user?.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-sm">{auth?.user?.name}</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* User Dropdown Menu */}
                <div
                  className={`absolute top-full right-0 mt-1 w-48 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 transition-all duration-300 ${
                    isUserMenuOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-1">
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      className="block px-3 py-2 text-sm text-white/90 hover:bg-white/20 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <span className="flex items-center space-x-2">
                        <span>📊</span>
                        <span>Dashboard</span>
                      </span>
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 font-medium"
                    >
                      <span className="flex items-center space-x-2">
                        <span>🚪</span>
                        <span>Logout</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cart */}
            <Badge count={cart?.length} showZero>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "bg-white/10 text-white/80 hover:text-white hover:bg-white/20"
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 3M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.4" />
                </svg>
              </NavLink>
            </Badge>

            {/* Mobile menu button */}
          <button
  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
  onClick={toggleMenu}
  aria-label="Toggle navigation"
>
  <div className="w-6 h-6 relative flex flex-col items-center justify-center gap-1.5">
    <span
      className={`block w-5 h-0.5 bg-current transform transition-all duration-300 origin-center ${
        isMenuOpen ? "rotate-45 translate-y-1.5" : ""
      }`}
    />
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
        isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
      }`}
    />
    <span
      className={`block w-5 h-0.5 bg-current transform transition-all duration-300 origin-center ${
        isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
      }`}
    />
  </div>
</button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 transform transition-all duration-300 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          
          {/* Mobile Search */}
          <div className="w-full">
            <SearchInput />
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            {/* Mobile Categories */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
                onClick={toggleCategories}
                aria-expanded={isCategoriesOpen}
              >
                <span>Categories</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`mt-1 space-y-1 pl-3 transition-all duration-300 ${
                  isCategoriesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <Link
                  className="block px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  to="/categories"
                  onClick={() => {
                    setIsCategoriesOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  All Categories
                </Link>
                {categories?.map((c, index) => (
                  <Link
                    key={index}
                    className="block px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    to={`/category/${c.slug}`}
                    onClick={() => {
                      setIsCategoriesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Authentication */}
            {!auth?.user ? (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-sm bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold text-center shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </>
            ) : (
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white/10 rounded-lg font-medium text-white hover:bg-white/20 transition-all duration-300"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                      {auth?.user?.name?.charAt(0)}
                    </div>
                    <span>{auth?.user?.name}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`mt-1 space-y-1 pl-3 transition-all duration-300 ${
                    isUserMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="block px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;