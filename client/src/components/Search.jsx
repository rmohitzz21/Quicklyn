import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div
      className="
        w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border
        bg-white flex items-center text-gray-600 
        border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-400
        shadow-sm transition-colors duration-300
        group
      "
    >
      {/* Left Icon Area */}
      <div className="flex items-center justify-center w-12 h-full text-green-600 cursor-pointer hover:text-green-800 transition-colors duration-200">
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="flex justify-center items-center w-9 h-9 bg-green-100 rounded-full shadow hover:bg-green-200 transition-colors"
            aria-label="Back"
            title="Back"
          >
            <FaArrowLeft size={16} />
          </Link>
        ) : (
          <button
            onClick={redirectToSearchPage}
            aria-label="Go to Search"
            title="Go to Search"
            className="flex justify-center items-center w-9 h-9 hover:text-green-800 transition-colors"
          >
            <IoSearch size={20} />
          </button>
        )}
      </div>

      {/* Input / Text Animation Area */}
      <div className="flex-1 h-full flex items-center">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") redirectToSearchPage();
            }}
            className="
              w-full px-4 text-gray-400 text-sm cursor-pointer select-none
              hover:text-green-700 transition-colors duration-200
              outline-none
            "
            aria-label="Search prompt"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1500,
                'Search "bread"',
                1500,
                'Search "eggs"',
                1500,
                'Search "cheese"',
                1500,
                'Search "vegetables"',
                1500,
                'Search "fruits"',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="search"
            placeholder="Type to search..."
            className="
              w-full h-full px-4 text-gray-700 text-sm bg-transparent outline-none
              placeholder:text-gray-400
            "
            autoFocus
            aria-label="Search input"
          />
        )}
      </div>
    </div>
  );
};

export default Search;
