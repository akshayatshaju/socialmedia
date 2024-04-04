import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl, login } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
//import {jwtDecode} from "jwt-decode";


function AdminLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwtTokenAdmin');
        if (isLoggedIn) {
            navigate('/Admin/AdminDash');  // Redirect to the homepage
        }
    }, [navigate]); // Include navigate in the dependency array

    const adminlogin = async (credentials) => {
        try {
            const response = await axios.post(baseUrl + login, credentials);
            console.log(response,"response here")
            if (response.status === 200){
                navigate('/Admin/AdminDash');
            }
        } catch (error) {
            alert("Wrong credentials");
            console.error(error);
        }
    };

    const [email_or_username, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email_or_username,
            password
        };
        await adminlogin(formData);
    };

    return (
        <div className="loginbox w-1/2 h-[407px] absolute left-1/4 top-[123px] bg-blue-500 border-2 shadow-md">
            <h1 className="admin_title text-xl font-bold text-black absolute top-0 right-1/2 mt-4">Admin Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-full">
                <input
                    type='text'
                    className='adminemail form-control  h-11 w-4/5  border-2 rounded-md px-3 py-2 my-4'

                    placeholder='Email.......'
                    value={email_or_username}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    className='adminpassword form-control w-4/5 h-11 border-2 rounded-md px-3 py-2 my-4'
                    placeholder='Password.......'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='admin_login btn w-36 h-12 rounded-md border-2 bg-grey-700 text-black font-semibold mt-4' type='submit'>Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
