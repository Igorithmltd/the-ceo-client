import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const SidebarItem = ({ to, icon, importedIcon: ImportedIcon, label, onClick }) => {
  return (
    <div className="flex">
      <NavLink
        to={to}
        className="flex justify-center items-center gap-5 text-bold focus:text-red border-l-4 
          border-transparent focus:bg-[#fbdddd87] focus:border-red 
          focus:-rounded-l-4 px-8 py-2"
        onClick={onClick}
      >
        <span className="text-gray-400">
          {ImportedIcon ? (
            <ImportedIcon size={24} className="object-cover" />
          ) : (
            <Icon icon={icon} width="24" height="24" className="object-cover" />
          )}
        </span>
        <span className="text-[15px]">{label}</span>
      </NavLink>
    </div>
  );
};

export default SidebarItem;
