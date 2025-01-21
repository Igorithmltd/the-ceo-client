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

const CardPin = () => {
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
        <div className="w-full py-2 text-center rounded md:mt-12">
          Confirm payment of <span className="font-bold">NGN 6,500</span> on a monthly basis
        </div>
        <div className="flex flex-col gap-4 w-full py-2">
          <div className="flex flex-col md:gap-0 gap-4">
            <label className=" text-xs md:mt-auto" htmlFor="">
              Please enter your card pin
            </label>
            <div className="flex w-full py-2 px-4 items-center border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
              <input
                type="text"
                name="card-pin"
                value=""
                placeholder="0000"
                // onChange={handleChange}
                className="w-full bg-gray-100 outline:none focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-4 items-center px-4 mt-12">
            <span className="text-gray-500">You can opt out of your subscription any time you wish</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 py-12 items-center justify-center md:bottom-0 md:absolute">
          <Link 
            to="/getting-started/payment/success" 
            className="w-full md:w-[90%] bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
          >
            Proceed to pay
          </Link>
          <Link to="/getting-started/payment/card-details" className="text-red-700 font-bold">Cancle</Link>
        </div>
      </div>
    </div>
  );
};

export default CardPin;
