import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
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

const Register = () => {
  const navigate = useNavigate()
  const api = ApiSetup()
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true)
  const [errors, setErrors] = useState([])
  const [showPassword, setShowPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState(initialRegister)
  const {setAppLoading, appLoading} = useModal()

  const {email, businessname} = registrationData

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password)=>{
    const newErrors = [];

    // Check for length greater than 8
    if (password.length <= 8) {
      newErrors.push("Password must be longer than 8 characters.");
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      newErrors.push("Password must contain at least one uppercase letter.");
    }

    // Check for number
    if (!/\d/.test(password)) {
      newErrors.push("Password must contain at least one number.");
    }

    // Check for special symbol
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.push("Password must contain at least one special symbol.");
    }

    return newErrors;

  }

  const handlePasswordChange = (e)=>{
    const newPassword = e.target.value;
    setPassword(newPassword);
    setRegistrationData({...registrationData, password: newPassword})

    const validationErrors = validatePassword(newPassword);
    setErrors(validationErrors);

    // Set isValid to true if no errors
    if (validationErrors.length === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  const handleChange = (e)=>{
    const {name, value} = e.target
      setRegistrationData({...registrationData, [name]: value})
  }
  const setPhoneData = (phone)=>{
    setPhone(phone)
    setRegistrationData({...registrationData, phone})
  }

  const handleSubmit = async ()=>{
    try {
      if(!email || !businessname || !password || !phone || errors.length > 0){
        return toast.error("Please enter required fields")
      }
      setRegistrationData({...registrationData, phone, password})
      setAppLoading(true)
      const res = await api.post("registeruser", {
        phone,
        email,
        password,
        businessname
      })

      if(res?.data?.message == 'Successful'){
        toast.success(res?.data?.message)
        setAppLoading(false)
        return navigate(`/auth/verify-account?email=${email}`)
      }
      if(res?.data?.message == "User already exists"){
        toast.error(res?.data?.message)
        setAppLoading(false)
      }

      setAppLoading(false)
    } catch (error) {
      setAppLoading(false)
      console.log(error,'the error')
    }
  }

  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-[50px] md:mt-16 md:w-[80%]">
          <div className="flex justify-center">
            <img src="/images/ceo-logo.png" alt="ceo-logo" />
          </div>
          <div className="mt-[30px] w-full flex flex-col items-center gap-4">
            <h4 className="font-bold">Create an account</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              Your comprehensive solution for managing sales, expenses, and more
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {/* <div className="flex flex-col md:flex-row gap-6 md:gap-0 mt-5">
              <label className="hidden md:block text-xs md:w-1/5 md:mt-auto" htmlFor="">
                Name
              </label>
              <div className="flex flex-col md:flex-row md:w-4/5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="md:hidden text-xs" htmlFor="">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="md:hidden text-xs" htmlFor="">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                    />
                  </div>
                  
                </div>
              </div>
            </div> */}
            <div className="flex flex-col  md:flex-row md:gap-0 gap-1 mt-[5px]">
              <label className="w-fit text-xs md:w-1/5 md:mt-auto" htmlFor="">
                Phone no.
              </label>
              <div className="border-b border-gray-400 md:w-4/5">
                {/* <input className="" type="text" />
                 */}
                <PhoneInput
                  international
                  placeholder="9000000000"
                  value={phone}
                  onChange={setPhoneData}
                  flags={flags}
                  defaultCountry="NG"
                  className="phone-input mr-0 bg-gray-300 md:w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-0 gap-1">
              <label className=" text-xs md:w-1/5 md:mt-auto" htmlFor="">
                Email
              </label>
              <div className=" md:w-4/5">
                {/* <input className="" type="text" />
                 */}
                <input
                  type="text"
                  name="email"
                  value={registrationData?.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <label className=" text-[12px] md:w-1/5 md:mt-auto" htmlFor="">
                Password
              </label>
              <div className="relative w-full md:w-4/5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handlePasswordChange}
                  value={password}
                  className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline-none focus:outline-none"
                />
                <div
                  className={`absolute ${errors.length > 0 ? 'top-[30%]' : 'top-[50%]'} right-3 transform -translate-y-1/2 cursor-pointer`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </div>
              {errors.length > 0 && <span className="text-[10px] text-red">{errors[0]}</span>}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-0 gap-1">
              <label className=" text-xs md:w-1/5 md:mt-auto" htmlFor="">
                Business name
              </label>
              <div className=" md:w-4/5">
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your business name"
                  name="businessname"
                  value={registrationData?.businessname}
                  className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                />
              </div>
            </div>
          </div>
          
          <div className=" py-12">
            <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded">
              Create account
            </button>
          </div>
          <div className="mt-5 text-center">
            <p className="text-gray-700">
              Already have an account? <Link to="/auth/signin-email" className="text-red-700">Login</Link>
            </p>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;
