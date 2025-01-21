import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";

const UserLayout = () => {
  return (
    <div className="">
      <Header2 />
      <div>
        <span className="container mx-auto px-4 flex md:hidden items-center justify-center gap-4 mt-[82px]  text-[12px] font-bold">
          <img src="/images/Ellipse 990.svg" width={19} alt="" />
          <h3>ARTS BY ARTS DESIGNS AND PRINT</h3>
          <img src="/images/material-symbols_verified-rounded.svg" width={10} alt="" />
        </span>
      </div>
      <main className="flex md:flex-col h-[91vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
