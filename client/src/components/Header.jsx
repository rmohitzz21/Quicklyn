import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const isSearchPage = location.pathname === "/search";

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 h-24 lg:h-20 flex flex-col justify-center transition-all duration-300">
      {!isSearchPage || !isMobile ? (
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center h-full transition-transform duration-300 hover:scale-105"
            aria-label="Quicklyne Home"
          >
            {/* Desktop Logo */}
            <svg
              width="170"
              height="60"
              viewBox="0 0 220 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden lg:block"
            >
              <g>
                <circle cx="30" cy="30" r="22" stroke="#22C55E" strokeWidth="4" />
                <path
                  d="M40 40 L54 54"
                  stroke="#22C55E"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <polygon points="54,54 49,47 58,47" fill="#22C55E" />
              </g>
              <text
                x="68"
                y="40"
                fontFamily="Segoe UI, Arial, sans-serif"
                fontSize="34"
                fill="#222"
                fontWeight="600"
                letterSpacing="2"
              >
                Quicklyne
              </text>
            </svg>

            {/* Mobile Logo */}
            <svg
              width="120"
              height="42"
              viewBox="0 0 220 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:hidden"
            >
              <g>
                <circle cx="30" cy="30" r="22" stroke="#22C55E" strokeWidth="4" />
                <path
                  d="M40 40 L54 54"
                  stroke="#22C55E"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <polygon points="54,54 49,47 58,47" fill="#22C55E" />
              </g>
              <text
                x="68"
                y="40"
                fontFamily="Segoe UI, Arial, sans-serif"
                fontSize="24"
                fill="#222"
                fontWeight="600"
                letterSpacing="1.5"
              >
                Quicklyne
              </text>
            </svg>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-grow px-4">
            <Search />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Mobile User Icon */}
            <button
              onClick={handleMobileUser}
              className="text-primary-500 lg:hidden focus:outline-none focus:ring-2 focus:ring-green-400 rounded transition-colors hover:bg-green-50 p-1"
              aria-label="User Account"
            >
              <FaRegCircleUser size={30} />
            </button>

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center gap-6 relative">
              {user?._id ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold text-gray-700 bg-gray-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                    aria-haspopup="true"
                    aria-expanded={openUserMenu}
                  >
                    <span>Account</span>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </button>

                  {/* Dropdown Animation */}
                  {openUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLogin}
                  className="text-green-700 font-semibold hover:text-green-900 transition-colors"
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400 hover:scale-105"
                aria-label="My Cart"
              >
                <div className="animate-pulse">
                  <TiShoppingCart size={28} />
                </div>
                <span>My Cart</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile Search */}
      {isMobile && (
        <div className="container mx-auto px-4 lg:hidden pt-2 animate-slideDown">
          <Search />
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out forwards;
          }
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-5px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
