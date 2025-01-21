import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import SuccessSalesModal from "../../components/modals/SuccessSalesModal";

const AutoGenerateAboutModal = () => {
    const {isAutoAboutOpen, setIsAutoAboutOpen} = useModal()
    const {isSuccessSalesOpen, setIsSuccessSalesOpen} = useModal();

      const handleSuccessModalOpen = () => {
        setIsAutoAboutOpen(false);
        setIsSuccessSalesOpen(true);
      };
      const closeModal = () => {
            setIsAutoAboutOpen(false);
        };

  return (
    <Modal isOpen={isAutoAboutOpen} closeModal={closeModal} >
      <div className="absolute md:relative m-auto md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[60vw] w-full max-h-[80%] overflow-y-scroll rounded pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
            <div className="flex justify-between">
               <h2>Add about</h2>
            </div>
            
            <div>
                <ImCancelCircle className=" text-gray-400 font-thin"  size={17} title="close" onClick={closeModal} />
            </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
            <div className="flex-1 px-6 md:h-full overflow-auto text-xs">
                <div className="flex flex-col px-1 gap-4">
                    <label className="flex gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <span className="text-center text-black">
                                About your business/shop/website
                            </span>
                            <CiCircleQuestion 
                            className="text-top text-gray-400 font-thin"
                            size={15} />
                        </div>
                        <div className="flex text-gray-400">
                            <span className="ml-auto">
                                0/5000
                            </span>
                        </div>
                    </label>
                    <div className="flex gap-4">
                        <textarea name="" id="" 
                            className="flex-1 p-4 min-w-md h-80 md:h-48 border border-black outline-none rounded">
                            About Us

                            Welcome to [Your Website Name], where innovation meets excellence. Founded in [Year], 
                            we are dedicated to providing top-notch [products/services] that cater to your needs 
                            and exceed your expectations.

                            Our Mission

                            At [Your Website Name], our mission is to [briefly describe your mission, e.g., 
                                “deliver high-quality products that bring joy and convenience to our customers’ lives”]. 
                            We believe in [core values, e.g., “integrity, innovation, and customer satisfaction”], and 
                            these principles guide everything we do.

                            Our Story

                            It all started with a simple idea: [briefly describe the inspiration behind your company, e.g., 
                                “to create a platform where people can find unique and high-quality products easily”]. 
                            Over the years, we have grown from a small startup to a thriving business, thanks to our dedicated 
                            team and loyal customers.
                        </textarea>
                    </div>
                </div>
                <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12">
                    <button 
                        className="text-red py-2 md:py-4 px-4 md:px-8 border-red border-[2px] 
                        rounded-[50px] flex justify-center font-bold md:gap-3">
                        Auto-generate
                    </button>
                    <div className="flex gap-4 items-center justify-end px-1">
                      <button 
                          className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                          onClick={ handleSuccessModalOpen }
                          >
                          <FiPlus /> <span className="">Add</span>
                        </button>  
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default AutoGenerateAboutModal;
