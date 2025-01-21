import React, { useState } from "react";
import TextInput from "./TextInput";
import { GiPadlock } from "react-icons/gi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LoginForm = ({ phoneNo, setPhoneNo, password, setPassword, showError }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-5 ">
      <div className="md:flex items-center md:items-end md:gap-10">
        <label className="text-xs md:w-1/5" htmlFor="phone">Phone no.</label>
        <div className="w-full md:w-4/5 bg-[#e5e5e5] border-b border-black-300">
          <TextInput
            name="contact"
            placeholder="90000000"
            // icon={<GiPadlock size={23} color="#b1b1b1" />}
            inputType={"text"}
            string={phoneNo}
            onUpdate={setPhoneNo}
            error={showError("contact")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-1">
        <div className="flex flex-col gap-1 md:flex-row items-center md:items-end md:gap-10">
          <label className="flex-item mr-auto text-xs md:w-1/5" htmlFor="password">Password</label>
          <div className="w-full md:w-4/5 bg-[#e5e5e5] border-b border-black-300">
            <TextInput
              name="password"
              placeholder="Enter your password"
              // icon={<GiPadlock size={23} color="#b1b1b1" />}
              inputType={"password"}
              string={password}
              onUpdate={setPassword}
              error={showError("password")}
              eyeIcon={
                showPassword ? (
                  <IoEyeOffOutline size={23} color="gray" />
                ) : (
                  <IoEyeOutline size={23} color="gray" />
                )
              }
              onTogglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
          </div>
        </div>
        <Link className="ml-auto text-xs text-blue" to="/auth/forgot-password">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
