import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { handleLogout, isLoggedIn, setIsLoggedIn } = useAuth();

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    try {
      accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 border-gray-200 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Brand Name */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img src="/assests/logo.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Finance Tracker
          </span>
        </NavLink>

        {/* Hamburger Menu Button (for mobile) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium text-white flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-transparent shadow-md md:shadow-none md:items-center">
            <li>
              <NavLink
                to={isLoggedIn ? "/dashboard" : "/"}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                    isActive ? "text-blue-400 font-bold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                    isActive ? "text-blue-400 font-bold" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                    isActive ? "text-blue-400 font-bold" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Conditional Rendering */}
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                        isActive ? "text-blue-400 font-bold" : ""
                      }`
                    }
                  >
                    Transactions
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-3 px-4 rounded hover:bg-red-700  md:hover:text-blue-400 transition-colors duration-200 bg-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                        isActive ? "text-blue-400 font-bold" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 transition-colors duration-200 ${
                        isActive ? "text-blue-400 font-bold" : ""
                      }`
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
