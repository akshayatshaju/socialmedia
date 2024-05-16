import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl, verify_email, verify_failed } from "../../utils/Constants";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Emailverify() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(100);
  const [otp, setOtp] = useState('');
  const [randomUserEmail, setRandomUserEmail] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const email = localStorage.getItem('randomUserEmail');
    setRandomUserEmail(email);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      const verificationFailFunction = async () => {
        try {
          await axiosInstance.post(baseUrl + verify_failed, { email: randomUserEmail });
          console.log("User removed after timer expired.");
        } catch (error) {
          console.error('Error in verificationFailFunction:', error.response || error);
        }
      };
      verificationFailFunction();
      navigate('/Signup');
    }
  }, [timer, randomUserEmail, navigate]);

  const verifyOtpSuccess = async () => {
    try {
      const response = await axiosInstance.post(baseUrl + verify_email, { email: randomUserEmail, otp });

      if (response.status === 200) {
        console.log(response.data, 'response');
        localStorage.removeItem('randomUserEmail');
        // toast.success('The user details have been updated.', {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        console.log(randomUserEmail,"randomuserrr");
        navigate('/');
        console.log("login navigate");
      } else {
        toast.error('Verification Failed! Please Try Again.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error in verifyOtpSuccess:', error.response || error);
      toast.error('Verification Failed! Please Try Again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtpSuccess();
  };

  return (
    <div className="signup h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Verify OTP
                </Typography>
                <Typography component="h6">
                  {randomUserEmail}
                </Typography>
                <strong>Time remaining: {timer} seconds </strong> 
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="Enter your otp"
                    name="otp"
                    autoComplete="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit Otp
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Emailverify;

