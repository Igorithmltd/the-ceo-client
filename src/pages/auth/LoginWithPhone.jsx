import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import AuthFooter from "../../components/AuthFooter";
import { encryptData, maskedId, setToLocalStorage } from "../../utils/encryption";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { toast } from "react-hot-toast";
import ApiSetup from "../../utils/ApiSetup";


const LoginWithPhone = () => {
  const [value, setValue] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {fetchUser} = useAuth()
  const {setAppLoading} = useModal()
  const api = ApiSetup()
  const navigate = useNavigate()


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e)=>{
    if(!phone || !password){
      return toast.error('Please enter required fields')
    }
    try {
      setAppLoading(true)
      const res = await api.post("userlogin",{
        phone,
        password,
        logtype: 'phone'
      })
      setAppLoading(false)

      if(res?.data?.u_id){
        if(res?.data?.account_state == 'inactive'){
          return navigate(`/auth/verify-account?email=${res?.data?.email}`)
        }
        if(res?.data?.profile == 'incomplete'){
          return navigate('/getting-started')
        }
        const masked_id = maskedId(res?.data?.u_id)
        const e_user = encryptData({...res?.data, masked_id})
        setToLocalStorage('moi-moi', e_user)
        fetchUser()
        toast.success('Login successful!')
        navigate('/dashboard')
      }else{
        toast.error('Something went wrong. Please try again later.')
      }
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
            <h4 className="font-bold">Login to your account</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Streamline your business options with our all-in-one accounting platform
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-2">
            <div className="flex flex-col gap-1 md:gap-0">
              <div className="flex flex-col md:flex-row gap-1 md:gap-0 md:w-full">
                <div className="flex text-[12px] md:w-1/5 md:mt-auto">
                  <label className="" htmlFor="">
                    Phone no.
                  </label>
                  <Link className="text-blue-900 ml-auto md:hidden" to="/auth/signin-email">
                  <span className=" bottom-[-4px] cursor-pointer right-0">Use email instead</span>
                  </Link>
                </div>
                
                <div className=" relative md:w-4/5 border-b border-gray-400">
                  {/* <input className="" type="text" />
                   */}
                  <PhoneInput
                    international
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    flags={flags}
                    defaultCountry="NG"
                    className="phone-input mr-0 bg-gray-300 md:w-full"
                  />
                  
                </div>
              </div>
              <Link className="text-blue-900 hidden md:block ml-auto" to="/auth/signin-email">
                <span className="cursor-pointer right-0 text-[12px]">Use email instead</span>
              </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-[20px]">
            <label className=" text-[12px] md:w-1/5 md:mt-auto md:pb-5" htmlFor="">
              Password
            </label>
            <div className="relative flex flex-col gap-1 w-full md:4/5">
              <div className="relative w-full">
                <input
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-[10px] border-b border-gray-500 bg-gray-100 outline-none focus:none"
                />
                <div
                  className="absolute top-[50%] right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </div>
              </div>
              
              <Link className="text-blue-900 ml-auto md:flex" to="/auth/reset-password">
                <span className=" bottom-[-4px] cursor-pointer text-[12px]">Forgot password?</span>
              </Link>
            </div>
          </div>
          <div className=" py-5">
            <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded">
              Login
            </button>
          </div>
          </div>
          
          <div className="mt-5 text-center">
            <p className="text-black">
              Don't have an account? <Link to="/auth/signup" className="text-red-600">Sign Up</Link>
            </p>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginWithPhone;
