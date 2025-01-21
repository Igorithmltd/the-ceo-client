import React from "react";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { CiCircleQuestion } from "react-icons/ci";
import { PiDotsThree } from "react-icons/pi";
import CustomTooltip from "../CustomTooltip";

const StatCard = ({
  title,
  value,
  percentageChange,
  isPositiveChange = true,
  isCash = true,
  isChange = true,
  days,
  onToggleDropdown,
  isDropdownOpen,
  onSelectDays,
}) => {
  return (
    <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2 relative">
      <div className="flex items-center">
        <div className="flex items-center gap-2 pt-2">
          <span className="font-bold text-[13px]">{title}</span>
          {isChange && (
            <span
              className={`rounded-full text-[12px] flex px-1 items-center ${
                percentageChange
                  ? isPositiveChange
                    ? "bg-green-100 text-green-500"
                    : "bg-[#fbdddd87] text-red"
                  : "bg-grey-10 text-[#808080]"
              }`}
            >
              {percentageChange ? (
                isPositiveChange ? (
                  <AiOutlineRise />
                ) : (
                  <AiOutlineFall />
                )
              ) : (
                <AiOutlineRise />
              )}
              {percentageChange ? `${percentageChange}%` : "0.0%"}
            </span>
          )}
        </div>
        <div className="ml-auto mb-auto">
        <CustomTooltip text="Some description"> 
          <span className="text-gray-400 ml-auto text-[16px] cursor-pointer"> 
            <CiCircleQuestion /> 
          </span> 
        </CustomTooltip>
        </div>
      </div>
      <span className="text-[23px] font-bold mt-2 ">
        {value ? `${isCash ? "₦" : ""}${value}` : `No ${title}`}
      </span>{" "}
      <span className="mt-3 text-[12px] text-gray-400 flex items-center">
        last {days} days{" "}
        <PiDotsThree
          className="ml-auto text-[24px] bg-gray-100 rounded b-2 text-gray-700 cursor-pointer"
          onClick={onToggleDropdown}
        />
      </span>
      {isDropdownOpen && (
        <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
          {[30, 60, 90].map((day) => (
            <div
              key={day}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectDays(day)}
            >
              {day} days
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;
