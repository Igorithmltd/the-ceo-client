import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleLeft } from "react-icons/tfi";
import { BsFillHouseAddFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup from "../../utils/ApiSetup";
import toast  from 'react-hot-toast'
import { useModal } from "../../context/ModalContext";
import PaystackComponent from "../../components/services/PaystackComponent";
import { useAuth } from "../../context/AuthContext";

const CardDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const api = ApiSetup()
  const {setAppLoading, appLoading} = useModal()
  const {userInfo} = useAuth()

  // const [subscription, setSubscription] = useState(null)

  const passed_subscription = location.state.subscription?.subcription

  useEffect(()=>{
  })

  const countValue = passed_subscription?.type == 'monthly' ? 1 : passed_subscription?.type == 'quarterly' ? 3 : passed_subscription?.type == 'yearly' ? 12 : 0
  const subscription = {
    package: passed_subscription?.package,
    count: countValue,
    plan: 'Monthly',
    amount: passed_subscription?.amount * countValue
  }

  console.log(subscription,'the stateer')

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
        <div className="flex flex-col gap-4 w-full py-2 md:mt-12">
          <div className="flex flex-col md:gap-0 gap-4">
            <PaystackComponent user={userInfo} payload={subscription} amount={subscription?.amount} buttonText='Proceed' />
            <label className=" text-xs md:mt-auto" htmlFor="">
              Card number
            </label>
            <div className="flex w-full py-2 px-4 items-center border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
              <input
                type="text"
                name="card-num"
                value=""
                placeholder="0000 0000 0000 0000"
                // onChange={handleChange}
                className="w-full bg-gray-100 outline:none focus:outline-none"
              />
              <span className="w-fit">VISA</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col md:gap-0 gap-4">
              <label className=" text-xs md:mt-auto" htmlFor="">
                CVV
              </label>
              <div className="flex w-full py-2 px-4 items-center border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
                <input
                  type="text"
                  name="card-num"
                  value=""
                  placeholder="000"
                  // onChange={handleChange}
                  className="w-full bg-gray-100 outline:none focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-4">
              <label className=" text-xs md:mt-auto" htmlFor="">
                Expiry date
              </label>
              <div className="flex w-full py-2 px-4 items-center border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
                <input
                  type="text"
                  name="card-num"
                  value=""
                  placeholder="02/06"
                  // onChange={handleChange}
                  className="w-full bg-gray-100 outline:none focus:outline-none"
                />
              </div>
            </div>
            
          </div>
          <div className="flex gap-4 items-center justify-center mt-12">
            <span className="text-gray-500">Your card details are totally safe and secure</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 py-12 items-center justify-center md:bottom-0 md:absolute">
          <Link 
            to="/getting-started/payment/card-pin" 
            className="w-full md:w-[90%] bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
          >
            Proceed
          </Link>
          <Link to="/getting-started/payment/method" className="text-red-700 font-bold">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
