import React, { useState } from 'react';
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { GrHelp } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { useModal } from "../../context/ModalContext";
import AvatarUpload from '../AvatarUpload';

const AddUserAdminModal = () => {
    const { isAddUserAdminOpen, setIsAddUserAdminOpen } = useModal()
    console.log(isAddUserAdminOpen, 'the add AddUserAdmin')
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }


    };
    const closeModal = () => {
        setIsAddUserAdminOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option');

    const options = ['Admin access (Full control)', 'Sales agent (Add sales, expenses, customers...)'];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isAddUserAdminOpen}>
            <div className="bg-white md:w-[90vw] w-full h-[75vh] rounded-lg">
                <div className="flex py-5 items-center justify-between px-8">
                    <div className="flex flex-col md:flex-row md:gap-5 items-center">
                        <h2>Add new customer</h2>
                    </div>
                    <ImCancelCircle size={25} title="close" onClick={() => setIsAddUserAdminOpen(false)} />
                </div>
                <hr className="h-4 font-black" />
                <div className="flex mt-5 flex-col md:flex-col overflow-hidden h-[90%] w-full pl-[12px]">

                    <AvatarUpload />
                    <div className="flex flex-col inputs space-y-8 overflow-y-auto scrollbar-thin h-[5000px]">
                        <div className="flex w-[100%] h-[80%]">
                            <div className="flex flex-col justify-between items-center w-[12%]">
                                <div className="rounded-full p-4 border">
                                    <FiUsers size={34} />
                                </div>
                                <div className="h-full border-l-2 border-gray-300"></div>
                            </div>
                            <div className="flex flex-col justify-around items-left w-[90%] h-full">
                                <h4 className="font-black flex items-center gap-4">What is the user’s name? <span className="text-grey-300 rounded-full p-2 border border-grey-200"><GrHelp size={10} /></span></h4>
                                <input type="text" name="" id="" className="border border-black rounded-lg w-[90%] h-[80%]" />
                            </div>
                        </div>
                        <div className="flex w-[100%] h-[80%]">
                            <div className="flex flex-col justify-between items-center w-[12%]">
                                <div className="rounded-full p-4 border">
                                    <FiUsers size={34} />
                                </div>
                                <div className="h-full border-l-2 border-gray-300"></div>
                            </div>
                            <div className="flex flex-col justify-around items-left w-[90%] h-full">
                                <h4 className="font-black flex items-center gap-4">What is the user’s email address <span className="text-grey-300 rounded-full p-2 border border-grey-200"><GrHelp size={10} /></span></h4>
                                <input type="text" name="" id="" className="border border-black rounded-lg w-[90%] h-[80%]" />
                            </div>
                        </div>
                        <div className="flex w-[100%] h-[80%]">
                            <div className="flex flex-col justify-between items-center w-[12%]">
                                <div className="rounded-full p-4 border">
                                    <FiUsers size={34} />
                                </div>
                                <div className="h-full border-l-2 border-gray-300"></div>
                            </div>
                            <div className="flex flex-col justify-around items-left w-[90%] h-full relative inline-block ">
                            <h4 className="font-black flex items-center gap-4">Bank <span className="text-grey-300 rounded-full p-2 border border-grey-200"><GrHelp size={10} /></span></h4>
                                {/* Select box */}
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="border border-black flex pt-[8px] align-items justify-between rounded-lg w-[90%] h-[60%] text-sm rounded-lg block pr-4 dark:placeholder-gray-400 dark:text-white"
                                >
                                    {selectedOption}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {/* Options */}
                                {isOpen && (
                                    <ul
                                        className="absolute top-16 w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                                        style={{ marginTop: '8px' }} // Extra margin-top if needed (Tailwind equivalent: mt-2 for 8px)
                                    >
                                        {options.map((option) => (
                                            <li
                                                key={option}
                                                onClick={() => handleOptionClick(option)}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                    </div>
                    <section className="my-10 py-4 flex gap-6 mx-auto w-[90%] justify-end">
                        <button onClick={() => setIsAddUserAdminOpen(false)} className="border-red-800 solid border py-4 px-8 font-black text-red-800 rounded-[50px] flex md:gap-3">Cancel</button>
                        <button onClick={() => setIsAddUserAdminOpen(true)} className="bg-red-800 py-4 px-8 text-white rounded-[50px] flex md:gap-3"><FaPlus /> Add</button>
                    </section>
                </div>
            </div>
        </Modal>
    );
}

export default AddUserAdminModal
