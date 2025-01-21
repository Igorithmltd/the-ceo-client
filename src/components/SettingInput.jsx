import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { PiReadCvLogoThin } from "react-icons/pi";

const SettingInput = ({ type='input', setSettingData, value, title, name, placeholder, nonEditable }) => {
    const [canEdit, setCanEdit] = useState(false)

    const handleChange = (e)=>{
        setSettingData(data=> ({...data, [e.target.name]: e.target.value}))
    }
  
  return (
    <div className="flex justify-between gap-4 items-center border border-gray-400 px-6 py-4 rounded">
      <div className="flex flex-col md:flex-row gap-1 md:gap-4 w-full">
        <div className="flex-1 md:flex-[1]">{title}</div>
        <div className="text-gray-600 h-full flex-1 md:flex-[4] w-full">
            <input
              className={`border h-full w-full md:w-2/3 py-2 px-3 rounded-lg ${nonEditable || !canEdit && 'bg-gray-300'}`}
              type="text"
              disabled={nonEditable || !canEdit}
              value={value}
              placeholder={placeholder ? placeholder : title}
              name={name}
              onChange={handleChange}
            />
        </div>
      </div>

      <div className="flex gap-2 items-center self-start md:self-auto md:w-[100px] text-blue-80" onClick={()=> setCanEdit(!canEdit)}>
        {!nonEditable &&
        <>
        {
            !canEdit ?
            <>
        <BsPencil
          // onClick={toggleCollapse}
          size={15}
          className="cursor-pointer"
          />
        <span>Edit</span>
        </>
        :
            <>
        <PiReadCvLogoThin
          // onClick={toggleCollapse}
          size={15}
          className="cursor-pointer"
          />
        <span>Close</span>
        </>
        }
        </>
        }
      </div>
    </div>
  );
};

export default SettingInput;
