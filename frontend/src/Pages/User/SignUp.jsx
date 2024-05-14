import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl, register } from "../../utils/Constants";




function SignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  //const [showSuccessModal, setShowSuccessModal] = useState(false); // Define showSuccessModal and setShowSuccessModal here
  //const [showVerifyModal, setShowVerifyModal] = useState(false);

  const signupUser = async (credentials) => {
    try {
      const response = await axios.post(baseUrl + register, credentials, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
     
      if (response) {
        console.log("the status is 201");

        toast.success('Extreme team has sent an OTP to your email for verification.', {
          onClose: () => {
            localStorage.setItem('randomUserEmail',email);
            console.log(email,"email success");
            navigate('/Emailverify');
          }
        });
      } else {
        console.log(response.data);
        toast.error('Invalid Details');
      }

    } catch (error) {
      setErrors(error.response.data);
      console.error(error.response.data);
      Object.keys(errors).forEach((field) => {
        if (field === "email") {
          toast.error(`Email : ${errors[field][0]}`);
        } else if (field === "username") {
          toast.error(`Username: ${errors[field][0]}`);
        } else if (field === "phone") {
          toast.error(`Phone: ${errors[field][0]}`);
        } else if (field === "password") {
          toast.error(`Password: ${errors[field][0]}`);
        }
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    } else if (!email.includes("@")) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (phone.trim() && !/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number must be 10 digits.");
      return;
    }
    setPhoneError("");



    const formData = {
      name: firstName,
      email,
      phone,
      username,
      password,
    };

    await signupUser(formData);

   
  };

  return (
    <div className="signup h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-blue-500 text-3xl text-center mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
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
         
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  phoneError ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && (
                <p className="text-red-500 text-xs italic">{phoneError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                UserName
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-xs italic">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="repeatpassword"
                type="password"
                placeholder="confirm password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Additional form inputs */}
            

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 md:mt-0 md:ml-2"
            >
              Create Account
            </button>
          </form>
          
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/">
            Sign in here
          </Link>
         
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
   
  
    </div>
  );
}

export default SignUp;
