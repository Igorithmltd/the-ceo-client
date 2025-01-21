import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/ceo-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    if (localStorage.getItem("moi-moi")) {
      localStorage.removeItem("moi-moi");
      return navigate("/auth/signup");
    }
    navigate("/auth/signup");
  };

  return (
    // <!-- component -->
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto container px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div>
          <div className="mt-16 flex flex-col lg:flex-row gap-8 xl:mt-0 w-full">
            <div className="flex flex-col lg:flex-row gap-8 gap-y-16 w-full justify-between">
              <div>
                <img className="h-14" src={logo} alt="CEO logo" />
              </div>

              <div>
                <h3 className="text-[14px] lg:text-[18px] font-semibold leading-6 text-blue">
                  Quick links
                </h3>
                <ul role="list" className="mt-8 space-y-6 text-[14px] text-grey-80">
                  <li>
                    <button className="hover:text-black" onClick={goToSignup}>
                      Get started
                    </button>
                  </li>
                  <li>
                    <Link className="hover:text-black" to="/auth/signin-email">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-black" to="#">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-black" to="#">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[14px] lg:text-[18px] font-semibold leading-6 text-blue">
                  Legal
                </h3>
                <ul role="list" className="mt-8 space-y-6 text-[14px] text-grey-80">
                  <li>
                    <Link className="hover:text-black" to="#">
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-black" to="#">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-black" to="/disclaimer">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[14px] lg:text-[18px] font-semibold leading-6 text-blue">
                  Connect with us
                </h3>
                <ul role="list" className="mt-8 space-y-6 text-[14px] text-grey-80">
                  <li>
                    <Link to="#" className=" hover:text-black flex items-center gap-2">
                      LinkedIn
                      <span>
                        <img src="/images/landing_page/Vector (7).png" alt="" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className=" hover:text-black flex items-center gap-2">
                      X (Twitter)
                      <span>
                        <img src="/images/landing_page/Vector (6).png" alt="" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className=" hover:text-black flex items-center gap-2">
                      Instagram
                      <span>
                        <img src="/images/landing_page/Vector.png" alt="" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className=" hover:text-black flex items-center gap-2">
                      Facebook
                      <span>
                        <img src="/images/landing_page/facebook.png" alt="" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t font-semibold text-right border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-[12px] leading-5 text-black">2020 &copy; TheCEOApp</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
