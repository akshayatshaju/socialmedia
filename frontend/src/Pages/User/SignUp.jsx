
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl,register } from '../../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';

function SignUp() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState("");
   
    
   

 // function which sends data to backend signup view function
    // const signupUser = async (formData) => {
    //     try {
    //         const response = await axios.post(baseUrl + register, formData);
    //         console.log(response);
    //         if (response && response.data) {
    //             console.log(response.data);
    //             toast.success("Account created successfully!");
    //             navigate('/Login'); // Redirect to login page after successful signup
    //         } else {
    //             toast.error("Error occurred while signing up. Please try again later.");
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.data) {
    //             Object.keys(error.response.data).forEach(field => {
    //                 if (field === "email") {
    //                     setEmailError(error.response.data[field][0]);
    //                 } else {
    //                     toast.error(`${field}: ${error.response.data[field][0]}`);
    //                 }
    //             });
    //         } else {
    //             toast.error("An error occurred while signing up. Please try again later.");
    //         }
    //     }
    // }
       // setting states for each input in form
       const signupUser = async (credentials) => {
        try {
          
            const response = await axios.post(baseUrl + register, credentials, {
              headers: {
                'Content-Type': 'multipart/form-data',  // Important for handling files
              },
            });
         
          console.log(response.data);
          navigate('/Login')
        } catch (error) {
          setErrors(error.response.data);
          console.error(error.response.data);
          Object.keys(errors).forEach(field => {
            console.log(field)
            if(field==="email"){
              toast.error(`Email : ${errors[field][0]}`);
            }
            else if(field==="username"){
              toast.error(`Username: ${errors[field][0]}`);
            }
           
            else if(field==="phone"){
              toast.error(`Phone: ${errors[field][0]}`);
            }
            // else if(field=="profile_pic"){
            //   toast.error(`Profile Picture: ${errors[field][0]}`);
            // }
            else if(field==="password"){
              toast.error(`Password: ${errors[field][0]}`);
            }
           
          
          
        });

         
        }
    }
    console.log(emailError,"email error")

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

  //   when submit form this fun is called
    const handleSubmit = async (event) => {
        event.preventDefault();

         // Check if email is empty
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        } else if (!email.includes('@')) {
            setEmailError("Invalid email format");
            return;
        }
        setEmailError("");

        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setEmailError("");//clear email error if any
        if (phone.trim() && !/^\d{10}$/.test(phone)) {
            toast.error('Phone number must be 10 digits.');
            return; // Prevent form submission
        }

        const formData = {
            name: firstName,
            
            email,
            phone,
            username,
            password
        };

        await signupUser(formData);
    };

    return (
        
        <div className="signup h-screen">
            <h1 className='text-green-600'>SignUp</h1>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md">
                    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                        <h1 className="text-blue-500 text-3xl text-center mb-6">Create Your Account</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='Phone Number' value={phone} onChange={(e) => setphone(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input id="email" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`} type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeatPassword">
                                    Repeat Password
                                </label>
                                <input id="repeatPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='password' placeholder='Repeat Password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                            </div>
                            <button className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Create Account</button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account? <Link className='text-blue-500' to="/Login">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;


