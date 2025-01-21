import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { LuWallet2 } from "react-icons/lu";
import { PiPaintBucket } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { Icon } from '@iconify-icon/react';

const MobileFooter = () => {
  const { pathname } = useLocation();

  return (
    <div className="md:hidden w-full fixed bottom-0 hd-[70px] border-2 flex justify-evenly py-4 bg-white z-[40]">
      <Link
        to="/dashboard"
        className={`cursor-pointer flex flex-col ${
          pathname === "/dashboard" && "text-red-600"
        }`}
      >
        {/* <MdOutlineSpaceDashboard size={18} className="mx-auto mb-2" /> */}
        <Icon icon="akar-icons:dashboard" width="18" height="18"
          className={`mx-auto mb-2 ${
            pathname == "/dashboard" && "text-red"
          }`} 
        />
        <p className="text-[8px]">Dashboard</p>
      </Link>
      <Link
        to="/dashboard/sales"
        className={`cursor-pointer flex flex-col ${
          pathname === "/dashboard/sales" && "text-red-600"
        }`}
      >
        <Icon icon="iconoir:coins" width="18" height="18"
          className={`mx-auto mb-2 ${
            pathname == "/dashboard/sales" && "text-red"
          }`} 
        />
        <p className="text-[8px]">Sales</p>
      </Link>
      <Link
        to="/dashboard/wallet"
        className={`cursor-pointer flex flex-col ${
          pathname === "/dashboard/wallet" && "text-red-600"
        }`}
      >
        <Icon icon="ph:wallet" width="18" height="18"
          className={`mx-auto mb-2 ${
            pathname == "/dashboard/wallet" && "text-red"
          }`} 
        />
        <p className="text-[8px]">Wallet</p>
      </Link>
      <Link
        to="/dashboard/designs"
        className={`cursor-pointer flex flex-col ${
          pathname === "/dashboard/designs" && "text-red-600"
        }`}
      >
        <Icon icon="fluent:design-ideas-24-regular" width="18" height="18"
          className={`mx-auto mb-2 ${
            pathname == "/dashboard/designs" && "text-red"
          }`} 
        />
        <p className="text-[8px]">Designs</p>
      </Link>
      <Link
        to="/dashboard/my-website"
        className={`cursor-pointer flex flex-col ${
          pathname === "/dashboard/my-website" && "text-red-600"
        }`}
      >
        <Icon icon="streamline:web" width="18" height="18"
          className={`mx-auto mb-2 ${
            pathname == "/dashboard/my-website" && "text-red"
          }`} 
        />
        <p className="text-[8px]">My Website</p>
      </Link>
    </div>
  );
};

export default MobileFooter;
