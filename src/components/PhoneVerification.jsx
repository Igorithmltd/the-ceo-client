import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import { auth } from "../firebase";

const PhoneVerification = () => {
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);


  const sendOTOP = async ()=>{
    try {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
        const confirmation = await signInWithPhoneNumber(auth, value, recaptcha)
        setUser(confirmation)
    } catch (error) {
        console.log(error,'the error')
    }
  }

  const verifyOTP = async ()=>{
    await user.confirm(otp)
  }


  return (
    <div>
      <h1>Phone Input</h1>
      <PhoneInput
        international
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        flags={flags}
        defaultCountry="NG"
        className="phone-input mr-0 bg-gray-300 md:w-full"
      />
      <div id="recaptcha"></div>
      <input value={otp} onChange={(e)=> setOtp(e.target.value)} type="text" placeholder="Enter OTP" />
      <button onClick={sendOTOP} className="border p-2 text-red">Send OTP</button>
    </div>
  );
};

export default PhoneVerification;
