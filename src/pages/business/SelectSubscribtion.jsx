import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleDown } from "react-icons/tfi";
import { BsFillHouseAddFill } from "react-icons/bs";
import { PiCheck } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup from "../../utils/ApiSetup";
import toast  from 'react-hot-toast'
import { useModal } from "../../context/ModalContext";

const initialRegister = {
  businessname: "",
  email: "",
  phone: "",
  password: ""
}

const SelectSubscribtion = () => {
  const [selectedSubscription, setSelectedSubscription] = useState('')
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('monthly')
  const [selectAmount, setSelectAmount] = useState(0)
  //Companybiz, Smallbiz
  const navigate = useNavigate()
  const api = ApiSetup()
  const {setAppLoading, appLoading} = useModal()

  const handleSelectedSubscripton = (value)=>{
    setSelectedSubscription(value)
  }

  const handleProceed = async ()=>{
    if(!selectedSubscription){
      return toast.error('Please select a subscription plan')
    }
    navigate('/getting-started/payment/provider', {state: {subscription: {package: selectedSubscription, type: selectedSubscriptionType, amount: selectAmount}}})
  }

  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-[50px] md:mt-16 md:w-[80%]">
          <div className="flex justify-center">
            <img src="/images/ceo-logo.png" alt="ceo-logo" />
          </div>
          <div className="mt-[30px] w-full flex flex-col items-center gap-4">
            <h4 className="font-bold">Select a subscription plan</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Unlock the full portential of your business with our tailored solutions.
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-6 justify-center">
              <span>2 of 2</span>
            </div>
            <div className="flex gap-6 justify-center">
              <hr className="h-1 rounded-full w-[100px] bg-blue-400" />
              <hr className="h-1 rounded-full w-[100px] bg-blue-900" />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className={`flex flex-col gap-6 border-red bg-red-50 px-8 py-6 rounded-md border ${selectedSubscription == 'Smallbiz' ? 'border-4' : 'border'}`}>
              <header className="flex flex-col gap-6 relative">
              <select value={selectedSubscriptionType} onChange={(e)=> setSelectedSubscriptionType(e.target.value)} className="absolute bg-red right-2 text-white py-1 px-2 rounded-lg" name="" id="">
                  <option value="monthly">Monthly plan</option>
                  <option value="quarterly">Quarterly plan</option>
                  <option value="yearly">Yearly plan</option>
                </select>
                <span>
                  <BsFillHouseAddFill 
                  size={50} 
                  className="text-red" />
                </span>
                <span className="text-red font-bold">
                  SMALL BIZ PLAN
                </span>
              </header>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  // size={20} 
                  className="bg-green" />
                  <span>Full dashboard access</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  // size={20} 
                  className="bg-green" />
                  <span>55 design categories</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  // size={20} 
                  className="bg-green" />
                  <span>35 downloads per month</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  // size={20} 
                  className="bg-green" />
                  <span>Access to all sale recept templates</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  // size={20} 
                  className="bg-green" />
                  <span>Live website features for your business</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-6 text-red">
                <span className="font-bold text-2xl">₦5,000/month</span>
                <button 
                  onClick={()=>{
                    setSelectAmount(5000)
                    handleSelectedSubscripton('Smallbiz')
                  }} 
                  className="px-6 py-2 border border-red rounded">
                  Select
                </button>
              </div>
            </div>
            <div className={`flex text-white flex-col gap-6 border-blue bg-blue-50 px-8 py-6 rounded-md ${selectedSubscription == 'Companybiz' ? "border-4 border-red" : "border"}`}>
              <header className="flex flex-col gap-6 relative">
                <span>
                  <BsFillHouseAddFill 
                  size={50} 
                  className="" />
                </span>
                <span className="font-bold">
                  COMPANY BIZ PLAN
                </span>
                <select value={selectedSubscriptionType} onChange={(e)=> setSelectedSubscriptionType(e.target.value)} className="absolute right-2 text-black py-1 px-2 rounded-lg" name="" id="">
                  <option value="montly">Monthly plan</option>
                  <option value="quarterly">Quarterly plan</option>
                  <option value="yearly">Yearly plan</option>
                </select>
              </header>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25}
                  className="" />
                  <span>Full dashboard access</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25}
                  className="" />
                  <span>66 design categories</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25}
                  className="" />
                  <span>Unlimited downloads per month</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25}
                  className="" />
                  <span>Access to all sale recept templates</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25} 
                  className="" />
                  <span>Live website features for your business</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25} 
                  className="" />
                  <span>Access to all design templates</span>
                </div>
                <div className="flex gap-4 items-center">
                  <PiCheck  
                  size={25} 
                  className="" />
                  <span>Access to more features and every upcoming features</span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-6">
                <span className="font-bold text-2xl">₦7,000/month</span>
                <button 
                  onClick={()=>{
                    setSelectAmount(7000)
                    handleSelectedSubscripton('Companybiz')
                  }}
                  className="px-6 py-2 border border-white rounded">
                  Select
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 py-12 items-center">
            <button
              onClick={handleProceed}
              className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
            >
              Proceed
            </button>
            <Link to="/getting-started" className="text-red-700 font-bold">Cancel</Link>
          </div>
          {/* <div className="flex justify-between my-5 text-center">
            <Link to="/getting-started" className="text-blue-700">Back</Link>
            <Link to="" className="text-red-700">Sign out</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SelectSubscribtion;
