import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";

const SuccessSalesModal = () => {
    const {isSuccessSalesOpen, setIsSuccessSalesOpen} = useModal();
    const {isSalesOpen, setIsSalesOpen} = useModal()

    const closeModal = () => {
        setIsSalesOpen(false);
        setIsSuccessSalesOpen(false);
    };

  return (
    <Modal isOpen={isSuccessSalesOpen} >
      <div className="absolute md:relative m-auto bottom-0 md:bottom-auto
        bg-white w-full md:w-[400px] max-h-[70%] rounded pt-16 pb-8">
        <div className="flex justify-center items-center">
            <span className="font-bold text-center">Your sale has been successfully added!</span> 
        </div>
        <div className="flex gap-5 justify-center mt-5 flex-col md:flex-row items-center">

                <button className="text-white py-4 px-4 md:px-8 bg-red border-red w-[70%]
                    border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3"
                     onClick={closeModal}>
                    Okay
                </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessSalesModal;
