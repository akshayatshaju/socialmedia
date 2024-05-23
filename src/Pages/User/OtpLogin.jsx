import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl, sentotp, verifyotp } from "../../utils/Constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    console.log(phoneNumber, "phoneenumberrr")
    try {
      const response = await axiosInstance.post(baseUrl + sentotp, { phone: phoneNumber });
      console.log(phoneNumber, "phone numberr")
      if (response.status === 200) {
        setIsOtpSent(true);
        toast.success("OTP sent successfully");
      }
      console.log("otp is send")
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    console.log("enter into verfyotp");
    console.log(otp,"otp is getting")
    try {
      const response = await axiosInstance.post(baseUrl + verifyotp, { otp });
      console.log(otp,"otp is getting")
      if (response.status === 200) {
        localStorage.setItem("jwtToken", response.data.access);
        console.log("enter into jwttoken ")
        localStorage.setItem("refreshjwtToken", response.data.refresh);
        console.log("enter into refreshtoken ")
        toast.success("OTP verified successfully");
        console.log("otp is verfied ")
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="flex justify-center flex-col items-center h-screen">
        <div className="w-96 p-6 bg-gray-200 rounded-lg shadow-md">
          <h1 className="text-center text-green-600 mb-6">OTP Login</h1>
          {!isOtpSent ? (
            <div>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={handleSendOtp}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
