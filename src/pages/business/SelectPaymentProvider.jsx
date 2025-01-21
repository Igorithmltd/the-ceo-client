import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleDown } from "react-icons/tfi";
import { BsFillHouseAddFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { FaDotCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup from "../../utils/ApiSetup";
import toast from "react-hot-toast";
import { useModal } from "../../context/ModalContext";

const SelectPaymentProvider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const api = ApiSetup();
  const { setAppLoading, appLoading } = useModal();

  const [paymentProvider, setPaymentProvider] = useState("");

  const passed_subscription = location.state.subscription;

  const handlePaymentProvider = async () => {
    if (!paymentProvider) {
      return toast.error("Please select a payment provider");
    }
    navigate(
      `/getting-started/payment/method?paymentMethod=${paymentProvider}`,
      { state: {subcription: passed_subscription} }
    );
  };

  return (
    <div className="h-full">
      <div className="flex flex-col gap-12 items-center md:p-12 relative h-full">
        <header className="w-full font-bold">Select a payment Provider</header>
        <div className="flex flex-col gap-4 w-full">
          <div
            onClick={() => setPaymentProvider("paystack")}
            className={`flex justify-between px-8 py-4 border ${
              paymentProvider == "paystack" ? "border-red" : "border-gray-500"
            } rounded-md items-center`}
          >
            <div className="flex gap-4">
              <img
                src="/images/paystack.png"
                className="h-full w-full"
                alt="welcome image"
              />
              <span className="font-bold">Paystack</span>
            </div>
            {paymentProvider == "paystack" ? (
              <FaDotCircle className="text-red-700" />
            ) : (
              <FaRegCircle className="text-gray-700" />
            )}
          </div>
          <div
            onClick={() => setPaymentProvider("flutterwave")}
            className={`flex justify-between px-8 py-4 border ${
              paymentProvider == "flutterwave"
                ? "border-red"
                : "border-gray-500"
            } rounded-md items-center`}
          >
            <div className="flex gap-4">
              <img
                src="/images/flutterwave.png"
                className="h-full w-full"
                alt="welcome image"
              />
              <span className="font-bold">flutterwave</span>
            </div>
            {paymentProvider == "flutterwave" ? (
              <FaDotCircle className="text-red-700" />
            ) : (
              <FaRegCircle className="text-gray-700" />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 py-12 items-center justify-center md:bottom-0 md:absolute">
          <button
            onClick={handlePaymentProvider}
            className="w-full md:w-[90%] bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
          >
            Proceed
          </button>
          <Link
            to="/getting-started/subscribtion"
            className="text-red-700 font-bold"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentProvider;
