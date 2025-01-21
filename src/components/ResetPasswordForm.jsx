import React, { useState } from "react";
import TextInput from "./TextInput";
import { GiPadlock } from "react-icons/gi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetPasswordForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="md:flex items-center gap-10">
        <label htmlFor="password">Enter Password</label>
        <div className="w-full">
          <TextInput
            name="password"
            placeholder="Create new password"
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
      </div>
      <div className="md:flex items-center gap-10">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="w-full">
          <TextInput
            name="confirmpassword"
            placeholder="Confirm new password"
            icon={<GiPadlock size={23} color="#b1b1b1" />}
            inputType={"password"}
            string={confirmPassword}
            onUpdate={setConfirmPassword}
            error={showError("confirmpassword")}
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
    </div>
  );
};

export default ResetPasswordForm;
