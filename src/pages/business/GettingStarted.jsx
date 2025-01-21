import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiAngleDown } from "react-icons/tfi";
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

const GettingStarted = () => {
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
        navigate('/auth/signin-email', {state: {password, email}})
      }
      if(res?.data?.message == "User already exists"){
        toast.error(res?.data?.message)
      }
      console.log(res,'the register')
      setAppLoading(false)
    } catch (error) {
      setAppLoading(false)
      console.log(error,'the error')
    }
  }

  const [fileName, setFileName] = useState('-- Choose a file --');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : '-- Choose a file --');
  };

  return (
    <div className="h-full">
      <div className="flex justify-center items-center md:p-12 relative">
        <div className="flex flex-col mt-[50px] md:mt-16 md:w-[80%]">
          <div className="flex justify-center">
            <img src="/images/ceo-logo.png" alt="ceo-logo" />
          </div>
          <div className="mt-[30px] w-full flex flex-col items-center gap-4">
            <h4 className="font-bold">Getting Started</h4>
            <p className="text-zinc-400 text-xs text-center mb-8 md:mb-6 px-6">
              We would like to learn more about you before getting you onboard
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-6 justify-center">
              <span>1 of 2</span>
            </div>
            <div className="flex gap-6 justify-center">
              <hr className="h-1 rounded-full w-[100px] bg-blue-900" />
              <hr className="h-1 rounded-full w-[100px] bg-gray-400" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs" htmlFor="">
                      Business logo (Optional)
                    </label>
                    {/*<input
                      type="file"
                      placeholder="-- hose a file --"
                      className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                    />*/}
                    <div className="relative w-full">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      <div className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 text-gray-600 pointer-events-none">
                        {fileName}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="md:hidden text-xs" htmlFor="">
                      What is the name of your business? <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter business name"
                      className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                    />
                  </div>
                  
                </div>
              </div>
            <div className="flex flex-col md:gap-0 gap-1 mt-[5px]">
              <label className="w-fit text-xs md:mt-auto" htmlFor="">
                What is your business slogan? (Optional)
              </label>
              <div className="border-b border-gray-400 w-full">
                {/* <input className="" type="text" />
                 */}
                <input
                  type="text"
                  placeholder="Enter your business slogan"
                  className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs w-full md:mt-auto" htmlFor="">
                Which country is your business located? <span>*</span>
              </label>
              <div className=" w-full">
                <div className="flex items-center relative w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
                  <select id="countries" className="flex-1 appearance-none py-2 w-full
                      leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>--</option>
                    <option value="US">Oil</option>
                    <option value="CA">Bread</option>
                    <option value="FR">Fish</option>
                    <option value="DE">Car</option>
                  </select>
                  <TfiAngleDown
                    size={15}
                     className="focus:outline-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs w-full md:mt-auto" htmlFor="">
                What state/province? <span>*</span>
              </label>
              <div className=" w-full">
                <div className="flex items-center relative w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
                  <select id="countries" className="flex-1 appearance-none py-2 w-full
                      leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>--</option>
                    <option value="US">Oil</option>
                    <option value="CA">Bread</option>
                    <option value="FR">Fish</option>
                    <option value="DE">Car</option>
                  </select>
                  <TfiAngleDown
                    size={15}
                     className="focus:outline-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="md:hidden text-xs" htmlFor="">
                What is your office address? (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter office address"
                className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="md:hidden text-xs" htmlFor="">
                Refferal code (Optional)
              </label>
              <input
                type="text"
                placeholder="Refferal code (3626737)"
                className="w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none"
              />
            </div>
            <div className="flex flex-col md:gap-0 gap-1 mt-[5px]">
              <label className="w-fit text-xs md:mt-auto" htmlFor="">
                What is your customer care phone number? <span>*</span>
              </label>
              <div className="border-b border-gray-400 w-full">
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
            <div className="flex flex-col gap-1">
              <header>What services does your business provide?</header>
              <div className="flex flex-col md:flex-row">
                <label className=" text-[12px] md:w-1/5 md:mt-auto" htmlFor="">
                  Service 1 <span>*</span>
                </label>
                <div className="border-b border-gray-400 w-full">
                  {/* <input className="" type="text" />
                   */}
                  <input
                    type="text"
                    placeholder="Enter your business slogan"
                    className="w-full py-2 px-4 border-b border-black bg-gray-100 outline:none focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <label className=" text-[12px] md:w-1/5 md:mt-auto" htmlFor="">
                  Service 2
                </label>
                <div className="border-b border-gray-400 w-full">
                  {/* <input className="" type="text" />
                   */}
                  <input
                    type="text"
                    placeholder="Enter your business slogan"
                    className="w-full py-2 px-4 border-b border-black bg-gray-100 outline:none focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs w-full md:mt-auto" htmlFor="">
                What is your primary brand color? <span>*</span>
              </label>
              <div className=" w-full">
                <div className="flex items-center relative w-full py-2 px-4 border-b border-gray-400 bg-gray-100 outline:none focus:outline-none">
                  <select id="countries" className="flex-1 appearance-none py-2 w-full
                      leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>Select a color</option>
                    <option value="US">Oil</option>
                    <option value="CA">Bread</option>
                    <option value="FR">Fish</option>
                    <option value="DE">Car</option>
                  </select>
                  <TfiAngleDown
                    size={15}
                     className="focus:outline-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs w-full md:mt-auto" htmlFor="">
                What is your secondary brand color(optional)? <span>*</span>
              </label>
              <div className=" w-full">
                <div className="flex items-center relative w-full py-2 px-4 border-b-2 border-black bg-gray-100 outline:none focus:outline-none">
                  <select id="countries" className="flex-1 appearance-none py-2 w-full
                      leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>Select a color</option>
                    <option value="US">Oil</option>
                    <option value="CA">Bread</option>
                    <option value="FR">Fish</option>
                    <option value="DE">Car</option>
                  </select>
                  <TfiAngleDown
                    size={15}
                     className="focus:outline-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1 mt-[5px]">
              <label className="w-fit text-xs md:mt-auto" htmlFor="">
                Business website(Optional)
              </label>
              <div className="flex items-center relative w-full border-b-2 border-black bg-gray-100 outline:none focus:outline-none">
                  <span className="flex items-center px-4 h-full rounded">https://</span>
                  <input className="flex-1 py-2 pl-4 outline-none w-full" type="text" placeholder="your website" />
                  
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs md:mt-auto" htmlFor="">
                Business Instagram handle(Optional)
              </label>
              <div className="flex items-center relative w-full border-b-2 border-black bg-gray-100 outline:none focus:outline-none">
                  <span className="flex items-center px-4 h-full rounded">/</span>
                  <input className="flex-1 py-2 pl-4 outline-none w-full" type="text" placeholder="username" />
                  
              </div>
            </div>
            <div className="flex flex-col md:gap-0 gap-1">
              <label className=" text-xs md:mt-auto" htmlFor="">
                Business Facebook handle(Optional)
              </label>
              <div className="flex items-center relative w-full border-b-2 border-black bg-gray-100 outline:none focus:outline-none">
                  <span className="flex items-center px-4 h-full rounded">/</span>
                  <input className="flex-1 py-2 pl-4 outline-none w-full" type="text" placeholder="facebook username" />
                  
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 py-12 items-center">
            <Link 
              to="/getting-started/subscribtion" 
              className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white p-3 rounded text-center"
            >
              Proceed
            </Link>
            <Link to="" className="text-red-700 font-bold">Sign out</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
