import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const DashboardLink = ({ to, icon, importedIcon: ImportedIcon, label, isActive, isCollapsed }) => {
  return (
    <Link to={to}>
      <div
        className={`w-full flex p-3 items-center gap-4 cursor-pointer ${
          isActive && "bg-red-200"
        } relative`}
      >
        {isActive && (
          <div className="absolute h-full top-0 left-0 bg-red w-[6px] rounded-br-[40px] rounded-tr-[40px]"></div>
        )}
        {ImportedIcon ? (
          <ImportedIcon className={`text-[30px] ${isActive ? "text-red" : ""}`} />
        ) : (
          <Icon icon={icon} className={`text-[30px] ${isActive ? "text-red" : ""}`} />
        )}
        {isCollapsed && (
          <span className={`text-[15px] pt-1 ${isActive && "text-red font-semibold"}`}>{label}</span>
        )}
      </div>
    </Link>
  );
};

export default DashboardLink;
