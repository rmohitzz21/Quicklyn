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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 h-24 lg:h-20 flex flex-col justify-center">
      {!isSearchPage || !isMobile ? (
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          {/* Inline SVG Logo */}
          <Link
            to="/"
            className="flex items-center h-full hover:opacity-90 transition-opacity duration-200"
            aria-label="Quicklyne Home"
          >
            <svg
              width="170"
              height="60"
              viewBox="0 0 220 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="quicklyneLogoTitle"
              className="hidden lg:block"
            >
              <title id="quicklyneLogoTitle">Quicklyne Logo</title>
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

            {/* Smaller SVG for mobile */}
            <svg
              width="120"
              height="42"
              viewBox="0 0 220 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="quicklyneMobileLogoTitle"
              className="lg:hidden"
            >
              <title id="quicklyneMobileLogoTitle">Quicklyne Logo</title>
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

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-grow px-4">
            <Search />
          </div>

          {/* User / Cart Area */}
          <div className="flex items-center gap-4">
            {/* Mobile user icon */}
            <button
              onClick={handleMobileUser}
              className="text-primary-500 lg:hidden focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              aria-label="User Account"
              title="User Account"
            >
              <FaRegCircleUser size={30} />
            </button>

            {/* Desktop user menu / Login */}
            <div className="hidden lg:flex items-center gap-6 relative">
              {user?._id ? (
                <div>
                  <button
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 px-3 py-2 rounded-md font-semibold text-gray-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
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
                  {openUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLogin}
                  className="text-green-700 font-semibold hover:text-green-900 transition"
                  aria-label="Login"
                >
                  Login
                </button>
              )}

              {/* Cart Button */}
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-700 hover:bg-green-900 text-white font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="My Cart"
              >
                <div className="animate-bounce">
                  <TiShoppingCart size={28} />
                </div>
                <span>My Cart</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="container mx-auto px-4 lg:hidden pt-2">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
