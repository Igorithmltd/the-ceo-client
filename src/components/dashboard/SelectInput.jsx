import React from "react";
import { LiaCoinsSolid } from "react-icons/lia";
import { CiCircleQuestion } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";

const SelectInput = ({
  label,
  labelIcon: LabelIcon = LiaCoinsSolid,
  tooltipIcon: TooltipIcon = CiCircleQuestion,
  options = [],
  value,
  onChange,
  id,
  disabled,
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
      <div className="flex gap-4">
        <span className={`w-[1px] h-[-1] rounded mx-6 ${isLast ? "" : "bg-gray-400"}`}></span>
        <div className="h-[42px] flex items-center relative w-full border-[#898989] border-[1.5px] rounded-[8px] mb-6 md:mb-10">
          <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="text-grey-20 bg-white text-[14px] md:text-[16px] flex-1 appearance-none py-2 ps-4  w-full leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          >
            <option value="" disabled>
              --
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="px-4">
            <TfiAngleDown size={17} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
