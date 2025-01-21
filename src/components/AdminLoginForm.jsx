import React, { useState } from "react";
import TextInput from "./TextInput";
import { BsPerson } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const AdminLoginForm = ({ phoneNo, setPhoneNo, password, setPassword, showError }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="md:flex items-center md:gap-10 mt-4">
      <label htmlFor="email">Id no</label>
      <div className="w-full">
        <TextInput
          name="contact"
          placeholder="Enter your admin identity No"
          icon={<BsPerson size={23} color="#b1b1b1" />}
          inputType={"text"}
          string={phoneNo}
          onUpdate={setPhoneNo}
          error={showError("contact")}
        />
      </div>
      <div className="md:flex items-center gap-10">
        <label htmlFor="password">Password</label>
        <div className="w-full">
          <TextInput
            name="password"
            placeholder="Enter your password"
            icon={<GiPadlock size={23} color="#b1b1b1" />}
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
        <Link className="float-right text-sm" to="/auth/forgot-password">
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginForm;
