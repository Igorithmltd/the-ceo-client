import React from "react";
import { LiaCoinsSolid } from "react-icons/lia";
import { CiCircleQuestion } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";

const TextInput = ({
  label,
  labelIcon: LabelIcon = LiaCoinsSolid,
  tooltipIcon: TooltipIcon = CiCircleQuestion,
  value,
  onChange,
  placeholder = "",
  id,
  type = "text",
  isCash = false,
  onClear,
  isLast = false,
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
        <div className="h-[42px] flex items-center relative w-full max-w-full border-[#898989] border-[1.5px] rounded-[8px] mb-6 md:mb-10">
          {isCash && (
            <span className="flex bg-[#999999] text-grey-20 px-3 md:px-6 text-[16px] h-full rounded-l-[8px] border-l-[1.5px] justify-center items-center">
              ₦
            </span>
          )}
          <input
            id={id}
            value={value}
            onChange={onChange}
            className="flex-1 py-2 ps-4 text-grey-20 text-[14px] md:text-[16px] border-none outline-none"
            type={type}
            placeholder={placeholder}
          />
          {isCash && (
            <span className="px-2 md:px-4  cursor-pointer text-[#787878]" onClick={onClear}>
              <ImCancelCircle size={17} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
