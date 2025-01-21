import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/ceo-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToSignup = () => {
    if (localStorage.getItem("moi-moi")) {
      localStorage.removeItem("moi-moi");
      return navigate("/auth/signup");
    }
    navigate("/auth/signup");
  };
  // Toggle menu open/close
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="bg-white shadow-md fixed top-0 width w-full z-50 ">
      <nav
        className=" container mx-auto  flex items-center justify-between py-4 px-5"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only text-black">Your Company</span>
            <img className="h-10 lg:h-12 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex items-center lg:gap-x-20 text-[15px] font-bold leading-6 text-blue-50 ">
          <Link to="#">Features</Link>
          <Link to="#">Pricing</Link>
          <Link to="/about">About TheCEOApp</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={goToSignup}
            className="rounded-[4px] bg-radial-gradient px-10 py-4 text-[16px] font-bold text-white shadow-sm"
          >
            Get started
          </button>
        </div>
      </nav>
      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      <div
        className={`lg:hidden fixed inset-0 z-10 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
        <div
          className={`fixed bg-black bg-opacity-50 inset-0 z-10 ${isMenuOpen ? "" : "hidden"}`}
          onClick={toggleMenu}
        ></div>
        <div className="fixed inset-y-0 right-0 z-10 w-[100%] min-h-[80vh] md:h-[100vh] overflow-y-auto bg-white p-8  sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only text-black">Your Company</span>
              <img className="h-10 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-12 flow-root">
            <div className="-my-6 ">
              <div className="space-y-2 py-6 text-[16px] font-bold leading-7 text-blue-50">
                <div className="space-y-6 py-6 text-[16px] font-bold leading-7 text-blue-50">
                  <Link to="#" className="-mx-3 block rounded-lg px-3 py-2">
                    Features
                  </Link>
                  <Link to="#" className="-mx-3 block rounded-lg px-3 py-2">
                    Pricing
                  </Link>
                  <Link to="/about" className="-mx-3 block rounded-lg px-3 py-2">
                    About TheCEOApp
                  </Link>
                  <Link to="/contact" className="-mx-3 block rounded-lg px-3 py-2">
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <button
                  onClick={goToSignup}
                  className="w-full rounded-[4px] bg-radial-gradient px-8 py-4 text-[16px] font-bold text-white shadow-sm"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
