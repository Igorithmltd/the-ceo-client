import React, { useState } from "react";
import TextInput from "./TextInput";
import { CiPhone } from "react-icons/ci";

const RegisterForm = ({ phoneNo, setPhoneNo, showError }) => {
  return (
    <div className="md:flex items-center md:gap-10">
      <label htmlFor="phone">Phone no.</label>
      <div className="w-full">
        <TextInput
          name="contact"
          placeholder="Enter your phone Number"
          icon={<CiPhone size={23} color="#b1b1b1" />}
          inputType={"text"}
          string={phoneNo}
          onUpdate={setPhoneNo}
          error={showError("contact")}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
