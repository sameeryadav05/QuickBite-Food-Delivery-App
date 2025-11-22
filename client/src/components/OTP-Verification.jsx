import React, { useEffect, useRef, useState } from "react";
import ramen from "../assets/ramen.png";

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);

  function handleSubmit() {
    const finalOtp = otp.join("");
    console.log(finalOtp);
  }

  // When user types a number
  function handleChange(e, index) {
    let value = e.target.value;

    // Allow only numbers
    value = value.replace(/[^0-9]/g, "");

    // Only take the last digit typed
    if (value.length > 1) value = value.slice(-1);

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Move to next box when digit entered
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  }

  // Handle backspace navigation
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="cursor-pointer h-fit w-[96%] lg:w-[30%] md:w-[60%]">
        <div className="flex flex-col items-center p-2 border border-borderColor shadow-xl gap-4 rounded-xl">
          <h1 className="tracking-wide text-2xl text-primaryColor flex items-center font-bold">
            <img src={ramen} className="size-12" />
            QuickBite
          </h1>

          <div className="mt-5 z-50 relative">
            <div className="flex gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRef.current[index] = el)}
                  className="size-12 border border-dashed border-gray-700 text-xl text-center font-bold rounded-md text-slate-900 focus:border-primaryColor"
                />
              ))}
            </div>
            <p className="text-primaryColor underline underline-offset-2 text-right mt-3">
              Resend otp !
            </p>
          </div>

          <button
            className="btn btn-wide text-white text-lg bg-primaryColor mt-5 mb-3 rounded-lg disabled:bg-orange-300"
            disabled={otp.includes("")}
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
