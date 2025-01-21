import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";
import ApiSetup from "../../utils/ApiSetup";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
    const {isLogoutOpen, setIsLogoutOpen} = useModal()
    const api = ApiSetup()
    const navigate = useNavigate()

    const closeModal = async() => {
        const res = await api.post("userlogout")
        if(res?.data?.message == 'Success'){
          localStorage.removeItem('moi-moi')
          navigate('/')
        }
        setIsLogoutOpen(false);
    };

  return (
    <Modal isOpen={isLogoutOpen} closeModal={closeModal} >
      <div className="absolute md:relative m-auto bottom-0 md:bottom-auto
        bg-white w-full md:w-[400px] max-h-[70%] rounded pt-16 pb-8 px-6">
        <div className="flex justify-center items-center">
            <span className="font-bold text-center">Are you sure you want to log out of this account?</span> 
        </div>
        <div className="flex gap-5 justify-between mt-5 items-center">
            <button className="text-red py-2 px-6 md:px-8 border-red
                border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3"
                 onClick={closeModal}>
                Cancel
            </button>
            <button className="text-white py-2 px-6 md:px-8 bg-red border-red
                border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3"
                 onClick={closeModal}>
                Okay
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
