import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, login } from "../../utils/Constants";
//import { googleLogout, useGoogleLogin,  } from "@react-oauth/google";
import Googlelogin from "../../Components/Googlelogin";

function Login() {
  const [email_or_username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
 

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
           
            {/* <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
             
            >
              Verify using Phone Number
            </button> */}
             <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => navigate('/otplogin')}
            >
              Verify using Phone Number
            </button>
            <button
              className="w-full p-2 mt-4 mb-4 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mb-4">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-500">
              Sign up
            </Link>
          </p>
          <div className="google-button">
         <Googlelogin/>
          </div>
       
        </div>
      </div>
  
    </div>
  );
}

export default Login;
