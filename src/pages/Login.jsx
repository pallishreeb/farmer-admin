import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin } from '../api'; // Import the adminLogin function from api.js

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone ) {
      toast.error('Please provide your phone number  to login!');
      return;
    }


    try {
      const response = await adminLogin(phone,otp,password);
      if(response?.userType  == "admin"){
      // Assuming the API returns a token upon successful login
      const token = response.token;
      localStorage.setItem('token', token); // Save the token to local storage
      localStorage.setItem('agri_user_id', response?.user_id);
      navigate('/admin/dashboard');
      }else{
        toast.error('You are not authorised for this site.');
        setPassword('')
      }
    } catch (error) {
      console.error('Login error:', error?.response?.data);
      setOtp('')
      setPassword('')
      toast.error(error?.response?.data?.Message || 'Failed to login. Please check your phone number and OTP.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with image */}
      <div className="hidden lg:block lg:w-1/2 bg-green-500 relative">
        {/* Overlay blue color */}
        <div className="absolute inset-0 bg-green-500 opacity-75"></div>
        <img
          src="login.png"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full md:w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl text-center mb-2">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div> */}
            {/* <h5 className='text-center'>Or</h5> */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Forgot Password link */}
            <div className="mb-6 text-right">
              <Link to="/reset-password"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
