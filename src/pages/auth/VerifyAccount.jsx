import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthFooter from "../../components/AuthFooter";
import ApiSetup, { generateFourDigitNumber } from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const VerifyAccount = () => {
  
  const api = ApiSetup()
  const {userInfo} = useAuth()
  const [value, setValue] = useState();
  const [email, setEmail] = useState('');
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill("")); // State for OTP
  const {search} = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(search,'the search')
    const email = search.split('=')[1]
    setEmail(email)
    sendVerificationCode()
  },[search])
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

  async function handleVerification(){
    try {
      const body = {
        vtype: 'email',
        verificationCode: otp.join(''),
        email: email,
        phone: '0'
      }
      //verify otp = checkverificationcode
      const res = await api.post('checkverificationcode', body)
      if(res?.data?.u_id){
        toast.success('Code verified successfully.')
        navigate('/getting-started')
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function sendVerificationCode(){
    try {
      const generatedCode = generateFourDigitNumber()

      const body = {
        vtype: 'email',
        code: generatedCode,
        email: email,
        phone: '0'
      }

      const res = await api.post('sendaccountverificationcode', body) //verify otp
      if(res?.data?.message == 'sent'){
        setShowCodeBox(true)
        toast.success('Verification code has been sent to your account')
      }
    } catch (error) {
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
            <h4 className="font-bold">Verify your account</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Streamline your business options with our all-in-one accounting platform
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-8 md:gap-2">
          <span className="text-xs md:text-sm font-bold my-4 text-center">
            Please input the OTP you recived in your email
          </span>
          {/* OTP Input Section */}
          <div className="flex mt-4 mb-16 justify-center" >
            <div className="relative md:w-3/5 flex flex-col gap-1">
              {
                showCodeBox &&
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
              }
              <div className="text-blue-900 mr-auto md:flex">
                <button onClick={sendVerificationCode} className="bottom-[-4px] cursor-pointer text-[12px] py-1">Resend OTP</button>
              </div>
            </div>
          </div>
          <div className=" py-5">
            <button onClick={handleVerification} className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded">
              Verify account
            </button>
          </div>
          </div>
          
          <div className="mt-5 text-center">
            <Link to="/auth/signin-phone" className="text-red-600">Go back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
