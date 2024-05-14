
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, register } from "../../utils/Constants";
//import FileUploader from '../../Components/FileUploader';

function Emailverify() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
 
  const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  
 


 

  



    
  

  return (
    <div className="signup h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-blue-500 text-3xl text-center mb-6">
            Verify your Email
          </h1>
          <form >
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                OTP
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          
            

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 md:mt-0 md:ml-2"
            >
              Create Account
            </button>
          </form>
         
        </div>
      </div>
      
   
      
    </div>
  );
};

export default Emailverify;
