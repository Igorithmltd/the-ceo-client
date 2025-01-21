import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleLeft } from "react-icons/tfi";
import { BsFillHouseAddFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup from "../../utils/ApiSetup";
import toast  from 'react-hot-toast'
import { useModal } from "../../context/ModalContext";

const SuccessPayment = () => {
  const navigate = useNavigate()
  const api = ApiSetup()
  const {setAppLoading, appLoading} = useModal()

  return (
    <div className="h-full">
      <div className="flex flex-col gap-12 items-center md:p-12 relative h-full">
        <header className="flex w-full md:px-6 py-6 md:pb-12 justify-between border-b border-gray-400">
          <div className="flex items-center gap-6 font-bold">
            <TfiAngleLeft 
              size={25}
              className="" 
            />
            <span>Pay with card</span>
          </div>
          <div className="flex gap-4 items-center">
            <img src="/images/paystack.png" className="h-full w-full" alt="welcome image" />
            <spam>Paystack</spam>
          </div>
        </header>
        <div className="flex flex-col gap-10 w-full md:my-12">
          <div className="w-full py-2 text-center font-bold">
            Payment successfull
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <img src="/images/check2-circle.png" className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]" alt="success image" />
          </div>
          <div className="flex flex-col gap-4 w-full py-2">
            <div className="flex gap-4 items-center px-4">
              <span className="text-gray-500 text-center">
                You should recieve a notification confirming your payment within 10 minutes, then subscription will be activated
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-4 py-12 items-center justify-center md:bottom-0 md:absolute">
          <Link 
            to="/dashboard" 
            className="w-full md:w-[90%] bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
          >
            Head to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
