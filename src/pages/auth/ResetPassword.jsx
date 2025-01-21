import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthFooter from "../../components/AuthFooter";
import flags from "react-phone-number-input/flags";
import ApiSetup from "../../utils/ApiSetup";
import { toast } from "react-hot-toast";
import { useModal } from "../../context/ModalContext";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [phone, setPhoneData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [genCode, setGenCode] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // State for OTP
  const [useEmail, setUseEmail] = useState(true);
  const [currentPasswordState, setCurrentPasswordState] = useState(0);
  const api = ApiSetup()
  const navigate = useNavigate()
  const {setAppLoading} = useModal()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  // Handle change in OTP input
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on next input if the current one has a value
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleRequestOTP = async()=> {
    try {
      if(useEmail && !email){
        return
      }
      if(!useEmail && !phone){
        return
      }
      const type = useEmail ? 'email' : 'phone'
      const reqData =  {
        type,
        email: useEmail ? email: "",
        phone: !useEmail ? phone : ""
      }
      setAppLoading(true)
      const res = await api.post('sendrecoverycode', reqData)
      console.log(res?.data, reqData,'the sent')
      if(res?.data?.message == 'Success'){
        setCurrentPasswordState(1)
        setGenCode(res?.data?.gencode)
      }else{
        toast.error('Something went wrong. Please check your email and try again')
      }
      setAppLoading(false)
    } catch (error) {
      setAppLoading(false)
      console.log(error)
    }
  }

  const handleVerifyOTP = async()=> {
    if(!otp){
      return toast.error('Please enter your otp')
    }
    try {
      setAppLoading(true)
      if(otp.join('') !== genCode.toString()){
        setEmail('')
        setOtp(new Array(6).fill(""))
        setCurrentPasswordState(0)
        return toast.error('Something went wrong verifying your OTP')
      }
      setCurrentPasswordState(2)
      setAppLoading(false)
    } catch (error) {
      setAppLoading(false)
      console.log(error)
    }
  }

  const handlePasswordReset = async()=> {
    try {
      const type = useEmail ? 'email' : 'phone'
      // console.log(first)
      if(password !== cPassword){
        return toast.error('Password must match to proceed')
      }

      const reqData =  {
        type,
        email: useEmail ? email: "",
        phone: !useEmail ? phone : "",
        password
      }
      useEmail ? delete reqData.phone : delete reqData.email
      setAppLoading(true)

      const res = await api.post('setnewpassword', reqData)
      if(res.data.message == 'Success'){
        toast.success('Password successfully changed')
        return navigate('/auth/signin-email')
      }
      setCurrentPasswordState(0)
      setEmail('')
      setOtp(new Array(6).fill(""))
      setPassword('')
      setCPassword('')
      setAppLoading(false)
    } catch (error) {
      setAppLoading(false)
      console.log(error)
    }
  }


  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col mt-[20px] md:mt-16 md:w-[80%]">
          <div className="flex justify-center">
            <img src="/images/ceo-logo.png" alt="ceo-logo" />
          </div>
          <div className="mt-[40px] flex flex-col items-center gap-[20px]">
            <h4 className="font-bold">Reset your password</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Streamline your business options with our all-in-one accounting
              platform
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-2">
            {useEmail ? (
              <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                <div className="flex md:w-[30%] md:mt-auto md:pb-5">
                  <label className="text-[12px]" htmlFor="">
                    Email
                  </label>
                  <Link
                    className="text-blue-900 ml-auto md:hidden"
                    to="/auth/signin-phone"
                  >
                    <span className=" bottom-[-4px] cursor-pointer right-0 ">
                      Send OTP
                    </span>
                  </Link>
                </div>
                <div className="relative md:w-full md:flex md:flex-col md:w-[70%]">
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full p-[10px] border-b border-gray-400 bg-gray-100 outline-none focus:none"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                  <div className="hidden text-red-700 ml-auto md:flex">
                    <span className=" bottom-[-4px] cursor-pointer text-[12px]">
                      {!email && "Please enter your email address"}
                      <span
                        className="text-blue"
                        onClick={() => setUseEmail(false)}
                      >
                        (use phone)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                <div className="flex md:w-[30%] md:mt-auto md:pb-5">
                  <label className="text-[12px]" htmlFor="">
                    Phone
                  </label>
                  <Link
                    className="text-blue-900 ml-auto md:hidden"
                    to="/auth/signin-phone"
                  >
                    <span className=" bottom-[-4px] cursor-pointer right-0 ">
                      Send OTP
                    </span>
                  </Link>
                </div>
                <div className="relative md:w-full md:flex md:flex-col md:w-[70%]">
                  <PhoneInput
                    international
                    placeholder="9000000000"
                    value={phone}
                    onChange={setPhoneData}
                    flags={flags}
                    defaultCountry="NG"
                    className="phone-input mr-0 bg-gray-300 md:w-full"
                  />
                  <div className="hidden text-red-700 ml-auto md:flex">
                    <span className=" bottom-[-4px] cursor-pointer text-[12px]">
                      {!phone && "Please enter your phone number"}
                      <span
                        className="text-blue"
                        onClick={() => setUseEmail(true)}
                      >
                        (use phone)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* OTP Input Section */}
            {currentPasswordState >= 1 && (
              <div className="flex flex-col md:flex-row gap-1 md:gap-4 mt-4">
                <div className="flex md:w-[30%] md:mt-auto md:pb-5">
                  <label className="text-[12px]" htmlFor="otp">
                    Enter the OTP
                  </label>
                </div>
                <div className="relative md:w-full flex md:flex-col md:w-[70%]">
                  <div className="flex gap-2">
                    {otp.map((data, index) => {
                      return (
                        <input
                          className="w-1/6 p-[10px] text-center border-b border-gray-700 bg-gray-100 outline-none focus:none"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      );
                    })}
                  </div>
                  <div className="hidden text-red-700 ml-auto md:flex">
                    <span className=" bottom-[-4px] cursor-pointer text-[12px]">
                      {!otp && "Please enter the OTP sent to your email"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {
              currentPasswordState >1 &&
              <>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label
                    className=" text-[12px] md:w-[30%] md:mt-auto md:pb-5"
                    htmlFor=""
                  >
                    Create Password
                  </label>
                  <div className="relative flex flex-col gap-1 w-full md:[70%]">
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-[10px] border-b border-gray-500 bg-gray-100 outline-none focus:none"
                      />
                      <div
                        className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <IoEyeOffOutline size={20} />
                        ) : (
                          <IoEyeOutline size={20} />
                        )}
                      </div>
                    </div>

                    <div
                      className="text-red-900 ml-auto md:flex"
                      to="/auth/reset-password"
                    >
                      <span className=" bottom-[-4px] cursor-pointer text-[12px]">
                        Enter new password
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <label
                    className=" text-[12px] md:w-[30%] md:mt-auto md:pb-5"
                    htmlFor=""
                  >
                    Confirm Password
                  </label>
                  <div className="relative flex flex-col gap-1 w-full md:[70%]">
                    <div className="relative w-full">
                      <input
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Re-enter password"
                        name="c_password"
                        value={cPassword}
                        onChange={(e)=> setCPassword(e.target.value)}
                        className="w-full p-[10px] border-b border-gray-500 bg-gray-100 outline-none focus:none"
                      />
                      <div
                        className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility2}
                      >
                        {showPassword2 ? (
                          <IoEyeOffOutline size={20} />
                        ) : (
                          <IoEyeOutline size={20} />
                        )}
                      </div>
                    </div>

                    <div
                      className="text-red-900 ml-auto md:flex"
                      to="/auth/reset-password"
                    >
                      <span className=" bottom-[-4px] cursor-pointer text-[12px]">
                        please enter your password
                      </span>
                    </div>
                  </div>
                </div>
              </>
            }
            <div className=" py-5">
              {currentPasswordState == 0 ? (
                <button
                  onClick={handleRequestOTP}
                  className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded"
                >
                  Request OTP
                </button>
              ) : currentPasswordState == 1 ? (
                <button
                  onClick={handleVerifyOTP}
                  className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded"
                >
                  Verify OTP
                </button>
              ) : (
                <button onClick={handlePasswordReset} className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded">
                  Reset password
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link to="/auth/signin-phone" className="text-red-600">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
