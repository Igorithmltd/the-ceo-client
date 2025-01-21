import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleLeft } from "react-icons/tfi";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup from "../../utils/ApiSetup";
import toast  from 'react-hot-toast'
import { useModal } from "../../context/ModalContext";

const ChosePaymentMethod = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const api = ApiSetup()
  const {setAppLoading, appLoading} = useModal()
  const [paymentMethod, setPaymentMethod] = useState('')

  const queryParams = new URLSearchParams(location.search)
  const passed_subscription = location.state

  useEffect(()=>{
    const paymentMethod = queryParams.get('paymentMethod')
    setPaymentMethod(paymentMethod)
  },[queryParams])

  const goToCardDetails = ()=>{
    navigate('/getting-started/payment/card-details', {state: {subscription: passed_subscription}})
  }


  return (
    <div className="h-full">
      <div className="flex flex-col gap-12 items-center md:p-12 relative h-full">
        <header className="flex w-full md:px-6 py-6 md:pb-12 justify-between border-b border-gray-400">
          <div className="flex items-center gap-6">
            <TfiAngleLeft 
              size={25}
              className="cursor-pointer" 
              onClick={()=> navigate('/getting-started/payment/provider', {state: {subscription: {package: passed_subscription}}})}
            />
            <span>Pay with card</span>
          </div>
          {
          paymentMethod == 'paystack' ?
          <div className="flex gap-4 items-center">
            <img src="/images/paystack.png" className="h-full w-full" alt="welcome image" />
            <span>Paystack</span>
          </div> :
          <div className="flex gap-4 items-center">
          <img src="/images/flutterwave.png" className="h-full w-full" alt="welcome image" />
          <span>Flutterwave</span>
        </div> 
          }
        </header>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between px-8 py-4 border border-red rounded-md items-center">
            <div className="flex gap-4">
              <img src="/images/card.png" className="h-[25px] w-[25px]" alt="welcome image" />
              <span className="font-bold">Pay with card</span>
            </div>
            <FaDotCircle
               className="text-red-700"
             />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 py-12 items-center justify-center md:bottom-0 md:absolute">
          <button 
          onClick={goToCardDetails}
            className="w-full md:w-[90%] bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
          >
            Proceed
          </button>
          <Link to="/getting-started/payment/provider" className="text-red-700 font-bold">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default ChosePaymentMethod;
