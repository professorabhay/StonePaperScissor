import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black border-yellow-400 border-2 rounded-3xl mx-8 mt-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2">
        <a href="/" className="flex items-center ml-4 space-x-3 ">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            RPS.
          </span>
        </a>
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
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
        <div
          className={`w-full md:block md:w-auto ${isMobileMenuOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <w3m-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
