import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api'; // Import the API function

const ResetPassword = () => {
    const navigate = useNavigate()
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePassword(phone, newPassword);
    //   console.log(res, "response")
     if(res?.data._id){
        navigate('/')
     }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
