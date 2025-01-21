import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSupportAgent } from "react-icons/md";

const Header2 = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 width w-full z-50">
      <div className="container mx-auto flex gap-2 items-center justify-between  px-4 py-6 ">
        <div>
          <NavLink to="/">
            <img src="/images/ceo-logo.png" alt="" className="w-[74px] md:w-[89px]" />
          </NavLink>
        </div>
        <span className="hidden md:flex items-center justify-between gap-4 text-xl font-black">
          <img src="/images/Ellipse 990.svg" alt="" />
          <h3>ARTS BY ARTS DESIGNS AND PRINT</h3>
          <img src="/images/material-symbols_verified-rounded.svg" alt="" />
        </span>
        <div className="">
          <span className="md:ml-auto flex gap-4 text-[12px] lg:text-xl font-extrabold text-red">
            <h3>Contact support</h3>
            <MdOutlineSupportAgent className="text-[20px] lg:text-xl" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header2;
