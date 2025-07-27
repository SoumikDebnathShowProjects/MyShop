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
  // JSX Return: Navbar component
  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-br from-indigo-500 to-purple-700 shadow-md shadow-black/10">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[70px] relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold italic bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent z-10 transition-all duration-300"
        >
          MyShop
        </Link>

        {/* //////////////////////////////////////// */}
        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden flex flex-col justify-between w-[30px] h-[21px] bg-transparent border-none cursor-pointer p-0 z-10 ${
            isMenuOpen ? "active" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-full h-[3px] rounded bg-white transition-transform duration-300 ${
              isMenuOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-[3px] rounded bg-white transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-full h-[3px] rounded bg-white transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          ></span>
        </button>

        {/* //////////////////////////////////////// */}
        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex flex-1">
          <div className="flex flex-row items-center w-full">
            {/* Search Input */}
            <div className="w-full max-w-[500px] my-2">
              <SearchInput />
            </div>

            <ul className="flex flex-row items-center justify-center gap-4 flex-wrap list-none m-0 p-0">
              {/* Home */}
              <li className="relative">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `text-white/90 no-underline px-4 py-2 rounded-full font-medium flex items-center gap-1 text-sm transition duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* //////////////////////////////////////// */}
              {/* Categories Dropdown */}
              <li className="relative">
                <button
                  className="flex items-center gap-1 bg-transparent border-none cursor-pointer px-4 py-2 rounded-full text-white/90 font-medium text-sm"
                  onClick={toggleCategories}
                  aria-expanded={isCategoriesOpen}
                >
                  Categories
                  <span
                    className={`text-xs transition-transform duration-300 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <ul
                  className={`absolute top-full left-1/2 -translate-x-1/2 -translate-y-2 bg-white rounded-lg shadow-md min-w-[200px] opacity-0 invisible transition-all duration-300 list-none py-2 mt-1 z-50 ${
                    isCategoriesOpen ? "opacity-100 visible translate-y-0" : ""
                  }`}
                >
                  <li>
                    <Link
                      className="block px-5 py-2 text-gray-800 hover:bg-gray-100 transition"
                      to="/categories"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c, index) => (
                    <li key={index}>
                      <Link
                        className="block px-5 py-2 text-gray-800 hover:bg-gray-100 transition"
                        to={`/category/${c.slug}`}
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* //////////////////////////////////////// */}
              {/* Authentication Links */}
              {!auth?.user ? (
                <>
                  <li className="relative">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `text-white/90 no-underline px-4 py-2 rounded-full font-medium flex items-center gap-1 text-sm transition duration-300 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `bg-gradient-to-br from-red-500 to-orange-500 text-white no-underline px-4 py-2 rounded-full font-semibold flex items-center gap-1 text-sm transition duration-300 ${
                          isActive ? "" : "hover:from-orange-500 hover:to-red-500"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="relative">
                  <button
                    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full font-medium text-white/90 cursor-pointer"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {auth?.user?.name?.charAt(0)}
                    </span>
                    {auth?.user?.name}
                    <span
                      className={`text-xs transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <ul
                    className={`absolute top-full left-1/2 -translate-x-1/2 -translate-y-2 bg-white rounded-lg shadow-md min-w-[200px] opacity-0 invisible transition-all duration-300 list-none py-2 mt-1 z-50 ${
                      isUserMenuOpen ? "opacity-100 visible translate-y-0" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-5 py-2 text-gray-800 hover:bg-gray-100 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block px-5 py-2 text-red-600 hover:text-white hover:bg-red-600 w-full text-left transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* //////////////////////////////////////// */}
              {/* Cart */}
              <li className="ml-2 relative">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `flex items-center gap-1 bg-white/10 px-4 py-2 rounded-full text-white/90 text-sm transition duration-300 ${
                        isActive ? "bg-white/20 text-white" : ""
                      }`
                    }
                  >
                    <span className="text-lg">🛒</span>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* //////////////////////////////////////// */}
      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-[70px] left-0 right-0 bg-gradient-to-br from-indigo-500 to-purple-700 p-5 shadow-md shadow-black/10 transform transition-all duration-300 max-h-[calc(100vh-70px)] overflow-y-auto z-40 ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="flex flex-col items-center">
          {/* Search Input */}
          <div className="w-full max-w-[500px] mb-5">
            <SearchInput />
          </div>

          <ul className="list-none p-0 m-0 flex flex-col items-center gap-4 w-full">
            <li className="w-full max-w-xs text-center relative">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block w-full px-4 py-3 rounded-md text-white/90 text-center font-medium transition duration-300 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "hover:bg-white/10 hover:text-white"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li className="w-full max-w-xs text-center relative">
              <button
                className="flex justify-center items-center gap-1 w-full px-4 py-3 rounded-md text-white/90 font-medium bg-transparent border-none cursor-pointer"
                onClick={toggleCategories}
                aria-expanded={isCategoriesOpen}
              >
                Categories
                <span
                  className={`text-xs transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`list-none p-0 mt-2 max-h-0 overflow-hidden transition-all duration-300 w-full rounded-md ${
                  isCategoriesOpen ? "max-h-[500px]" : ""
                }`}
              >
                <li>
                  <Link
                    className="block px-4 py-2 text-white/90 text-center hover:bg-white/10 transition"
                    to="/categories"
                    onClick={() => {
                      setIsCategoriesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    All Categories
                  </Link>
                </li>
                {categories?.map((c, index) => (
                  <li key={index}>
                    <Link
                      className="block px-4 py-2 text-white/90 text-center hover:bg-white/10 transition"
                      to={`/category/${c.slug}`}
                      onClick={() => {
                        setIsCategoriesOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth?.user ? (
              <>
                <li className="w-full max-w-xs text-center">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 rounded-md text-white/90 font-medium text-center transition duration-300 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "hover:bg-white/10 hover:text-white"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="w-full max-w-xs text-center">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 rounded-md font-semibold text-center transition duration-300 bg-gradient-to-br from-red-500 to-orange-500 text-white ${
                        isActive ? "" : "hover:from-orange-500 hover:to-red-500"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="w-full max-w-xs text-center relative">
                  <button
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md font-medium text-white/90 bg-white/10 cursor-pointer"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-semibold text-white">
                      {auth?.user?.name?.charAt(0)}
                    </span>
                    {auth?.user?.name}
                    <span
                      className={`text-xs transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <ul
                    className={`list-none p-0 mt-2 max-h-0 overflow-hidden transition-all duration-300 w-full rounded-md ${
                      isUserMenuOpen ? "max-h-[500px]" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2 text-white/90 text-center hover:bg-white/10 transition"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 w-full text-center transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li className="relative ml-2 w-full max-w-xs text-center">
              <Badge count={cart?.length} showZero>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-1 w-full px-4 py-3 rounded-md text-white/90 text-center transition duration-300 ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">🛒</span>
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
