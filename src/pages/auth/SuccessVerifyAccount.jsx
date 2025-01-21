import React, { useState } from "react";
import flags from "react-phone-number-input/flags";
import { Link } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";

const SuccessVerifyAccount = () => {
  const [value, setValue] = useState();

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col mt-[20px] md:mt-16 md:w-[80%]">
          <div className="flex justify-center">
            <img src="/images/ceo-logo.png" alt="ceo-logo" />
          </div>
          <div className="mt-[40px] flex flex-col items-center gap-[20px]">
            <h4 className="font-bold">Verify your account</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Streamline your business options with our all-in-one accounting platform
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-center my-4">
              Cheers! Your account has been successfully verified
            </span>
            <GrStatusGood 
              className="text-green-500 my-12"
              size={160} 
            />
          </div>
          <div className="mt-5 text-center w-full flex">
            <Link to="/auth/signin-phone" className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded">Continue</Link>
          </div>
          </div>
          
          
        </div>
      </div>
  );
};

export default SuccessVerifyAccount;
