import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import './LayoutCSS/Header.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          MyShop
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Desktop Navigation Menu */}
        <div className="desktop-menu">
          <div className="centered-nav">
            {/* Search Input */}
            <div className="navbar-search">
              <SearchInput />
            </div>

            <ul className="navbar-nav">
              {/* Home */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link" exact activeClassName="active">
                  Home
                </NavLink>
              </li>

              {/* Categories Dropdown */}
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle"
                  onClick={toggleCategories}
                  aria-expanded={isCategoriesOpen}
                >
                  Categories
                  <span className={`dropdown-arrow ${isCategoriesOpen ? 'active' : ''}`}>▼</span>
                </button>
                <ul className={`dropdown-menu ${isCategoriesOpen ? 'active' : ''}`}>
                  <li>
                    <Link className="dropdown-item" to="/categories" onClick={() => setIsCategoriesOpen(false)}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Authentication Links */}
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" activeClassName="active">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link auth-btn" activeClassName="active">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown user-dropdown">
                  <button 
                    className="nav-link dropdown-toggle user-menu"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                  >
                    <span className="user-avatar">{auth?.user?.name?.charAt(0)}</span>
                    {auth?.user?.name}
                    <span className={`dropdown-arrow ${isUserMenuOpen ? 'active' : ''}`}>▼</span>
                  </button>
                  <ul className={`dropdown-menu ${isUserMenuOpen ? 'active' : ''}`}>
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
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
                        className="dropdown-item logout-btn"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* Cart */}
              <li className="nav-item cart-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link cart-link" activeClassName="active">
                    <span className="cart-icon">🛒</span>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {/* Search Input */}
          <div className="navbar-search">
            <SearchInput />
          </div>

          <ul className="mobile-nav">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className="nav-link" 
                exact 
                activeClassName="active"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <button 
                className="nav-link dropdown-toggle"
                onClick={toggleCategories}
                aria-expanded={isCategoriesOpen}
              >
                Categories
                <span className={`dropdown-arrow ${isCategoriesOpen ? 'active' : ''}`}>▼</span>
              </button>
              <ul className={`mobile-dropdown-menu ${isCategoriesOpen ? 'active' : ''}`}>
                <li>
                  <Link 
                    className="dropdown-item" 
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
                      className="dropdown-item"
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
                <li className="nav-item">
                  <NavLink 
                    to="/register" 
                    className="nav-link" 
                    activeClassName="active"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/login" 
                    className="nav-link auth-btn" 
                    activeClassName="active"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button 
                    className="nav-link dropdown-toggle user-menu"
                    onClick={toggleUserMenu}
                    aria-expanded={isUserMenuOpen}
                  >
                    <span className="user-avatar">{auth?.user?.name?.charAt(0)}</span>
                    {auth?.user?.name}
                    <span className={`dropdown-arrow ${isUserMenuOpen ? 'active' : ''}`}>▼</span>
                  </button>
                  <ul className={`mobile-dropdown-menu ${isUserMenuOpen ? 'active' : ''}`}>
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
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
                        className="dropdown-item logout-btn"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item cart-item">
              <Badge count={cart?.length} showZero>
                <NavLink 
                  to="/cart" 
                  className="nav-link cart-link" 
                  activeClassName="active"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="cart-icon">🛒</span>
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .modern-navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          position: relative;
        }

        .navbar-brand {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          font-style: italic;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .desktop-menu {
          display: flex;
          width: 100%;
        }

        .centered-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .navbar-search {
          width: 100%;
          max-width: 500px;
          margin: 10px 0;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 15px;
          flex-wrap: wrap;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 25px;
          transition: all 0.3s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .auth-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white !important;
          font-weight: 600;
        }

        .auth-btn:hover {
          background: linear-gradient(45deg, #ee5a24, #ff6b6b);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 16px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 14px;
          border-radius: 25px;
        }

        .dropdown-arrow {
          font-size: 10px;
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.active {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          list-style: none;
          padding: 10px 0;
          margin: 5px 0 0 0;
          z-index: 1000;
        }

        .dropdown-menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 10px 20px;
          color: #333;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          background: #f5f5f5;
        }

        .user-dropdown .dropdown-toggle {
          background: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          margin-right: 8px;
        }

        .logout-btn {
          color: #e74c3c;
        }

        .logout-btn:hover {
          color: white;
          background: #e74c3c !important;
        }

        .cart-item {
          margin-left: 10px;
        }

        .cart-link {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 25px;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .mobile-toggle .hamburger-line {
          width: 100%;
          height: 3px;
          background: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .mobile-toggle.active .hamburger-line:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .mobile-toggle.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.active .hamburger-line:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 999;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
        }

        .mobile-menu.active {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mobile-nav {
          list-style: none;
          padding: 0;
          margin: 20px 0 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          width: 100%;
        }

        .mobile-nav .nav-item {
          width: 100%;
          max-width: 300px;
          text-align: center;
        }

        .mobile-nav .nav-link {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          justify-content: center;
        }

        .mobile-dropdown-menu {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          width: 100%;
        }

        .mobile-dropdown-menu.active {
          max-height: 500px;
        }

        .mobile-dropdown-menu .dropdown-item {
          padding: 10px 16px;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
        }

        .mobile-dropdown-menu .dropdown-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 992px) {
          .desktop-menu {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }
        }

        @media (min-width: 993px) {
          .mobile-menu {
            display: none;
          }

          .navbar-nav {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;