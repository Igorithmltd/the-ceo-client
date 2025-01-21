import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import { PiUsersLight, PiPlugsBold } from "react-icons/pi";
import { FaAnglesRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { baseUrl } from "../utils/ApiSetup";
import DashboardLink from "./DashboardLink";

export const menuLinks = [
  { to: "/dashboard", icon: "akar-icons:dashboard", label: "Dashboard" },
  { to: "/dashboard/designs", icon: "fluent:design-ideas-24-regular", label: "Designs" },
  { to: "/dashboard/my-website", icon: "streamline:web", label: "My Website" },
  { to: "/dashboard/sales", icon: "iconoir:coins", label: "Sales" },
  { to: "/dashboard/expenses", icon: "fluent:money-hand-16-regular", label: "Expenses" },
  { to: "/dashboard/transaction", icon: "hugeicons:arrow-left-right", label: "Transactions" },
  { to: "/dashboard/wallet", icon: "ph:wallet", label: "Wallet" },
  { to: "/dashboard/my-products", icon: "fluent-mdl2:product", label: "My Products" },
  { to: "/dashboard/my-services", icon: "mynaui:briefcase", label: "My Services" },
  { to: "/dashboard/my-customers", importedIcon: PiUsersLight, label: "My Customers" },
  { to: "/dashboard/Plugs", importedIcon: PiPlugsBold, label: "Plugs" },
  { to: "/dashboard/help-and-faqs", icon: "formkit:help", label: "Help & FAQs" },
];

export const addLinks = [
  { to: "/dashboard/user-admin", icon: "clarity:users-line", label: "Users" },
  { to: "/dashboard/settings", importedIcon: IoSettingsOutline, label: "Settings" },
];

const DashboardNavbar = () => {
  const { userInfo } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { pathname } = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <main
      className={`dashboard-navbar pb-20 border-r-2 border-grey-900 ${
        isCollapsed ? "w-fit" : "w-fit"
      } h-full`}
    >
      <div className="h-full overflow-auto whitespace-nowrap overflow-x-hidden">
        {isCollapsed ? (
          <div className="flex ustify-center py-4 pl-4 pr-8 gap-4 items-center border-y">
            <img
              className="object-cover rounded-full cursor-pointer"
              width={45}
              height={45}
              src={`${baseUrl}${userInfo?.logo}`}
            />
            <div className={`${isCollapsed ? "block" : "hidden"}`}>
              <h4 className="text-[15px]">{userInfo?.companyname}</h4>
              <span className="text-[10px] text-grey-40">Marketer</span>
            </div>
            <div className="hover:bg-red-50 p-2 rounded-full">
              <BsThreeDots onClick={toggleCollapse} size={15} className="cursor-pointer" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center py-5 gap-4 items-center border-y">
            <img
              className="object-cover rounded-full cursor-pointer"
              width={25}
              height={25}
              src={`${baseUrl}${userInfo?.logo}`}
            />
            <div className="hover:bg-red-50 rounded-full">
              <FaAnglesRight onClick={toggleCollapse} size={10} className="cursor-pointer" />
            </div>
          </div>
        )}
        <div className="pb-5 flex flex-col gap-2">
          {menuLinks.map((link) => (
            <DashboardLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              importedIcon={link.importedIcon}
              label={link.label}
              isActive={pathname === link.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
        <div className="mt-8 pb-5 flex flex-col gap-2">
          <div className="h-"></div>
          {addLinks.map((link) => (
            <DashboardLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              importedIcon={link.importedIcon}
              label={link.label}
              isActive={pathname === link.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardNavbar;