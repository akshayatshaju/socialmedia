import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, login } from "../../utils/Constants";

function Login() {
  const [email_or_username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(baseUrl + login, credentials);
      localStorage.setItem("jwtToken", response.data.access);
      localStorage.setItem("refreshjwtToken", response.data.refresh);
      navigate("/Home");
      toast.success("Successfully Logged in");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.details);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email_or_username,
      password,
    };
    await loginUser(formData);
  };

  // const onGoogleLoginSuccess = async (codeResponse) => {
  //     const google_token = codeResponse.credential;
  //     try {
  //         const googleuser = await axios.post(BASE_URL, { 'google_token': google_token });
  //         localStorage.setItem('jwtToken', googleuser.data.access);
  //         localStorage.setItem('refreshjwtToken', googleuser.data.refresh);
  //         navigate('/Home');
  //         toast.success(`Authenticated as ${googleuser.data.email_or_username}`);
  //     } catch (error) {
  //         console.error(error);
  //         toast.error(error.response ? error.response.data.details : "An error occurred. Please try again later.");
  //     }
  // };

  // const onGoogleLoginFailure = (error) => {
  //     console.error('Login Failed:', error);
  //     toast.error("An error occurred during Google login. Please try again later.");
  // };

  return (
    <div className="login">
      <div className="flex justify-center flex-col items-center h-screen">
        <div className="logo"></div>
        <div className="w-96 p-6 bg-gray-200 rounded-lg shadow-md">
          <h1 className="text-center text-green-600 mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Username or Email"
              value={email_or_username}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => setShowVerifyModal(true)}
            >
              Verify using Email
            </button>
            <button
              className="w-full p-2 mt-4 mb-4 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-700 mb-4">
            Forgot password?{" "}
            <Link to="#" className="text-blue-500">
              Reset here
            </Link>
          </p>
          <p className="text-center text-gray-700 mb-4">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-500">
              Sign up
            </Link>
          </p>
          <div className="text-center"></div>
        </div>
      </div>
      {/* Verify Modal */}
      {showVerifyModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* Your modal content here */}
                        <h2 className="text-2xl text-blue-600 mb-4">Verify Your Email</h2>
                        <p className="text-gray-800 mb-4">Enter the OTP sent to Email ID.</p>
                        {/* Example input field */}
                        <input type="text" className="border rounded px-4 py-2 mb-4" placeholder="Enter OTP" />
                        {/* Example button */}
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => console.log("Verify")}>Verify</button>
                        <button className="bg-transparent text-gray-700 px-4 py-2 rounded hover:text-gray-900 ml-4" onClick={() => setShowVerifyModal(false)}>Close</button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default Login;
