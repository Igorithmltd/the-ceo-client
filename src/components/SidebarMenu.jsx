import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { addLinks, menuLinks } from "./DashboardNavbar";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../context/AuthContext";
import { baseUrl } from "../utils/ApiSetup";

const SidebarMenu = ({ setMenuOpen }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { userInfo } = useAuth();

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 500); // Match the duration of the slide-out animation
  };

  const handleItemClick = () => {
    setMenuOpen(false);
  };

  return (
    // <section className="dashboard-sidebar overflow-auto fixed top-0 left-0 h-full w-64 bg-[#f4f4f4] text-black transform transition-transform duration-300">
    <section className="dashboard-sidebar overflow-auto fixed top-0 left-0 h-full w-72 bg-[#ffffff] text-black transform transition-transform duration-300">
      <article>
        <div className="flex flex-col border-b  border-dotted">
          <div className="pl-8 pt-8 flex items-center justify-between pr-4">
            <div>
              <NavLink to="/" onClick={handleItemClick}>
                <img src="/images/ceo-logo.png" alt="" className="" />
              </NavLink>
            </div>
            <IoIosClose
              onClick={() => setMenuOpen(false)}
              size={34}
              className="hover:text-red-600 cursor-pointer "
            />
          </div>
          <div className="p-8 flex gap-4 items-center">
            <div>
              <img
                className="rounded-full object-cover"
                width={50}
                height={50}
                src={`${baseUrl}${userInfo?.logo}`}
              />
            </div>
            <div>
              <div className="flex gap-2">
                <span className="text-[16px]">{userInfo?.companyname}</span>
                <span></span>
              </div>
              <span className="text-gray-400 text-[12px]">Marketer</span>
            </div>
          </div>
        </div>
      </article>
      <article>
        <nav className="h-full overflow-y-auto whitespace-nowrap space-y-1">
          {menuLinks.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              importedIcon={item.importedIcon}
              label={item.label}
              onClick={handleItemClick}
            />
          ))}
        </nav>
        <nav className="h-full overflow-y-auto whitespace-nowrap mt-8 space-y-1">
          {addLinks.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              importedIcon={item.importedIcon}
              label={item.label}
              onClick={handleItemClick}
            />
          ))}
        </nav>
      </article>
    </section>
  );
};

export default SidebarMenu;