import React from "react";
import { LiaCoinsSolid } from "react-icons/lia";
import { CiCircleQuestion } from "react-icons/ci";

const ValueField = ({
  label,
  labelIcon: LabelIcon = LiaCoinsSolid,
  tooltipIcon: TooltipIcon = CiCircleQuestion,
  value,
  isLast = false
}) => {
  return (
    <div className="flex flex-col px-1 text-black">
      <label className="flex gap-4 items-center">
        <div className="flex justify-center items-center border-[#BBBBBB] bg-white rounded-full border-[1.5px] p-2 size-[33px] md:size-[38px]">
          <LabelIcon className="size-[18px] md:size-[24px]" />
        </div>
        <div className="flex gap-2">
          <span className="text-center text-[14px] md:text-[16px] font-medium">{label}</span>
          <TooltipIcon className="text-top" size={15} />
        </div>
      </label>
      <div className="flex gap-4 text-[16px]">
        <span className={`w-[1px] h-[50px] rounded mx-6 ${isLast ? "" : "bg-gray-400"}`}></span>
        <p className="text-[#4D4D4D] w-full">{value}</p>
      </div>
    </div>
  );
};

export default ValueField;
