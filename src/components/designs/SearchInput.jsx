import React from 'react'
import { Stack} from "@mui/material";
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import {SelectObjectButton} from "../designs";
import { Icon } from '@iconify-icon/react';
import { CiCircleQuestion } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";

const SearchInput = (prop) => {
    const {itemvalue, itemSearchFunction, itemSearchMode, objectfocus,
    setItemSearchMode, filteredItemList, placeholder, label, 
    itemSearchSelectionHandler} = prop;
    return (
        <div>
            <div className="flex flex-col px-1">
                <label className="flex gap-4 items-center">
                    <div className="flex border-gray-400 rounded-full border p-2">
                    <Icon icon="iconoir:coins" width="20" height="20"
                    
                />
                    </div>
                    <div className="flex gap-2">
                    <span className="text-center">
                    {label?label:"Input Value"}
                    </span>
                    <CiCircleQuestion className="text-top" size={15} />
                    </div>
                </label>
                <div className="flex gap-4">
                    {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                    <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                    {/*</div>*/}
                    <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                    <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    style={{ width: "95%" }}
                    name="itemvalue"
                    placeholder={placeholder?placeholder:"Input Value *"}
                    id="itemvalue"
                    required
                    onChange={(e) => { itemSearchFunction(e.target.value) }}
                    value={itemvalue}
                    />
                    <i key="c" onClick={() => { setItemSearchMode(!itemSearchMode) }}
                    style={{ width: "5%" }}
                    className='text-blue-400 pr-2 pl-1 text-small cursor-pointer justify-center '>
                    {itemSearchMode ? <TfiAngleUp /> : <TfiAngleDown />}
                    </i>
                    </div>
                </div>
            </div>
            {/* <fieldset key="c" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'
                style={{ width: "100%" }}>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>{label?label:"Input Value"}</legend>
                <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                style={{ width: "95%" }}
                name="itemvalue"
                placeholder={placeholder?placeholder:"Input Value *"}
                id="itemvalue"
                required
                onChange={(e) => { itemSearchFunction(e.target.value) }}
                value={itemvalue}
                />
                <i key="c" onClick={() => { setItemSearchMode(!itemSearchMode) }}
                style={{ width: "5%" }}
                className='text-blue-400 pr-2 pl-1 text-small cursor-pointer
                                                hover:bg-blue-400 hover:text-blue-900 rounded-full flex flex-col justify-center '>
                {itemSearchMode ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                </i>
            </fieldset> */}
            {itemSearchMode && [
                <div key="d" className='searchOutput w-full relative'>
                {/* <div className="flex flex-col border  border-[#762323] bg-[#762323]  w-full justify-center max-h-60 overflow-scroll scrollbar-hide absolute"> */}
                <div className="flex flex-col border z-10 absolute top-[-23px] md:top-[-42px] bg-white md:mr-10 ml-[60px] md:ml-16 justify-center max-h-60 overflow-scroll scrollbar-hide">
                    <Stack key="b" className="flex flex-col  w-full justify-start max-h-48 mt-3 mb-2 pt-3 px-2 md:px-4 pb-1 overflow-scroll scrollbar-hide">
                    {filteredItemList?.map((items, index) => {
                        return (
                        <SelectObjectButton key={index} Style="color" type={"button"} objectfocus={objectfocus} FunctionToExecute={itemSearchSelectionHandler} >
                            {items}
                        </SelectObjectButton>
                        );
                    })}
                    </Stack>
                    {/* <span key="a" className='flex flex-row justify-center cursor-pointer pt-2 pb-2 rounded-lg hover:bg-blue-700 w-full bg-blue-900 text-white font-Inter-Regular text-sm font-extrabold'
                    onClick={() => { setItemSearchMode(false) }}>
                        Close
                    </span> */}
                </div>
                </div>
            ]}
        </div>
    )
}

export default SearchInput