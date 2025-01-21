/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from "react";
import LoadingAnimation from "./Loader";
import { Navigate } from "react-router-dom";

export default function EnterCode({ callback, reset, isVerifLoading }) {


  const [code, setCode] = useState("");

  // Refs to control each digit input element
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach((ref) => {
      ref.current.value = "";
    });
    inputRefs[0].current.focus();
    setCode("");
  };

  // Call our callback when code = 6 chars
  useEffect(() => {
    if (code.length === 6) {
      if (typeof callback === "function") callback(code);
      resetCode();
    }
  }, [code]); //eslint-disable-line

  // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Handle input
  function handleInput(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Update code state with single digit
    const newCode = [...code];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      inputRefs[index].current.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(""));

    input.select();

    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  // Select the contents on focus
  function handleFocus(e) {
    e.target.select();
  }

  // Handle backspace key
  function handleKeyDown(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  }

  // Capture pasted characters
  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  return (
    <div>
      {isVerifLoading && (
        <div className="">
          <LoadingAnimation
            loaderColor="#4405A5"
            loadingMessage="verifying account..."
          />
        </div>
      )}
      <div className=" mt-8 text-center relative">
        <div className="mb-3 font-semibold"> Enter OTP code</div>
        <div className="flex gap-2 items-center justify-center">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              className="text-2xl border-2 max-w-16 sm:min-w-12 h-16 rounded-lg flex p-2 text-center"
              key={index}
              type="text"
              required={true}
              maxLength={1}
              onChange={(e) => handleInput(e, index)}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifLoading}
            />
          ))}
        </div>
        <div className="absolute right-[45%] top-[]  text-white mt-2">
          {code.length ? (
            <p
              onClick={resetCode}
              className="text-s cursor-pointer bg-[#4405A5] py-1 px-2 rounded-lg text-white"
            >
              clear
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-full mt-14">
        <button
          className={`bg-gradient-to-t from-[#4405A5] to-[#ad77fd] text-white p-3 w-full rounded-xl ${
            code.length < 6
              ? "opacity-60 cursor-not-allowed"
              : "opacity-100 text-white"
          }`}
        >
          Verify account
        </button>
      </div>

      <div className="text-slate-500 text-center my-7">
        Didn't get a code?{" "}
        <button className="text-[#4405A5] font-semibold hover:underline">
          Resend
        </button>
      </div>


      
    </div>
  );
}
