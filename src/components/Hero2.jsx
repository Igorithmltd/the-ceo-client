import React from "react";
import { Link } from "react-router-dom";

const Hero2 = ({ heading, paragraph, button }) => {
  return (
    <div className="relative isolate mt-[50px] lg:mt-[70px] py-[60px] lg:pt-[60px] flex justify-center min-h-[70vh] bg-[url('/images/bg.png')] bg-no-repeat bg-cover">
      <div className="flex justify-center mx-6 lg:mx-8">
        <div className="max-w-2xl flex items-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl leading-8 font-bold tracking-tight text-gray-900 sm:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 text-[16px] leading-[49px] font-semibold text-gray-600">
              {paragraph}
            </p>
            {button ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="#"
                  className="rounded-[4px] bg-radial-gradient text-center px-12 py-4 text-[16px] font-extrabold text-white shadow-sm"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
