import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl, login } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



function AdminLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwtTokenAdmin');
        if (isLoggedIn) {
            navigate('/admin/AdminLogin');  // Redirect to the homepage
        }
    }, [])// Include navigate in the dependency array


    console.log(localStorage.getItem('jwtTokenAdmin'), "tooooken");

    const adminlogin = async (credentials) => {
        try {
            const response = await axios.post(baseUrl + login, credentials);
            console.log(response, "response here");
            const decodedToken = jwtDecode(response?.data?.access);
            console.log(decodedToken.is_superuser)
            if (decodedToken.is_superuser) {
                localStorage.setItem('jwtTokenAdmin', response.data.access);
                localStorage.setItem('refreshjwtTokenAdmin', response.data.refresh);

                console.log("saved succesfully")
                navigate('/admin/AdminDash');
            }
            else {
                alert("Not a superuser")
            }


        }
        catch (error) {
            alert("wrong credentials")
            console.error(error);
        }
    };

    const [email_or_username, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email_or_username, password, "state")

        const formData = {
            email_or_username, password
        };

        // Call your login function
        await adminlogin(formData);

    };

    return (
        <div className=' admin flex justify-center items-center h-vh'>
          <div className="loginbox w-full md:w-[400px] bg-blue-400 border-2 shadow-md rounded-lg p-8">
            <h1 className="admin_title text-xl font-bold text-black text-center mb-4">Admin Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
              <input
                type='text'
                className='adminemail form-control w-full h-11 border-2 rounded-md px-3 py-2 my-2'
                placeholder='Email...'
                value={email_or_username}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: '20px' }}
              />
              <input
                type='password'
                className='adminpassword form-control w-full h-11 border-2 rounded-md px-3 py-2 my-2'
                placeholder='Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontSize: '20px' }}
              />
              <button className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-4' type='submit'>Login</button>
            </form>
          </div>
        </div>
      );
      
}

export default AdminLogin;
