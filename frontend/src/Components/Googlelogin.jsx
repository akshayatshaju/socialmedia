

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl, google } from "../utils/Constants";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Googlelogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwtToken');
        if (isLoggedIn) {
            navigate('/Home');  // Redirect to the homepage if already logged in
        }
    },  [navigate]);

    const onGoogleLoginSuccess = async (codeResponse) => {
        setLoading(true);
        const google_token = codeResponse.credential;

        try {
            const googleuser = await axios.post(baseUrl + google, {
                google_token: google_token,
            });
            localStorage.setItem("jwtToken", googleuser.data.access);
            localStorage.setItem("refreshjwtToken", googleuser.data.refresh);
            navigate("/Home");
            toast.success(`Authenticated as ${googleuser.data.email_or_username}`);
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                toast.error("Unauthorized. Please login again.");
                // Redirect to login page
                navigate("/");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    }

    const onGoogleLoginFailure = (error) => {
        setLoading(false);
        console.error('Login Failed:', error);
        toast.error("An error occurred. Please try again later.");
    }

    return (
        <div>
            {loading ? <p>Loading...</p> : null}
            <div>
           <GoogleOAuthProvider clientId="729595361474-ea52de56p7s76lp9c8u6qk6on95u1mku.apps.googleusercontent.com">
                <GoogleLogin
                     onSuccess={onGoogleLoginSuccess}
                   onFailure={onGoogleLoginFailure}
                />
            </GoogleOAuthProvider>
        </div>
        </div>
    );
}

export default Googlelogin;

