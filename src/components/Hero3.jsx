import React from "react";
import { Link } from "react-router-dom";

const Hero3 = ({ button }) => {
  return (
    <div className="relative isolate py-10 mt-8 lg:mt-[58px] lg:py-[280px] bg-no-repeat bg-cover bg-center flex justify-center h-[70vh] bg-[url('/images/bg.png')]">
      <div className="flex justify-center mx-6 lg:mx-8">
        <div className="max-w-2xl flex items-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h3 className="text-[25px] lg:text-[44px] leading-8 font-extrabold tracking-tight text-red sm:text-6xl">
              Welcome!
            </h3>
            <p className="mt-10 text-[21px] lg:text-[36px] font-extrabold text-gray-600">
              What would you like to get from us today?
            </p>
            {button ? (
              <div className="mt-24 px-10 flex flex-col lg:flex-row justify-center gap-x-6 gap-y-6">
                <Link
                  to="#"
                  className="rounded-[4px] bg-radial-gradient px-10 py-4 text-[16px] font-bold text-white shadow-sm"
                >
                  Explore products
                </Link>
                <Link
                  to="#"
                  className="rounded-[4px] border-blue border px-10 py-4 text-[16px] font-bold text-blue shadow-sm"
                >
                  Message us
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

export default Hero3;
