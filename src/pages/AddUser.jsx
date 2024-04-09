import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideNavbar, TopNavbar } from '../components/Navbar';
import {createUser } from '../api'
import {toast} from 'react-toastify'

const AddUser = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('farmer'); // Default user type is farmer
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({
        phone,
        password,
        userType // Include userType in the request body
      });
      // Handle success response
      // console.log('User registered successfully:', response);
      toast.error(response?.Message);
      if (response?.result?.userType === 'farmer') {
        navigate('/admin/farmers');
      } else if (response?.result?.userType === 'buyer') {
        navigate('/admin/buyers');
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message || "Error in creating user, try later!");
      } else {
        setErrorMessage('Failed to register user. Please try again later.');
      }
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="container mx-auto mt-2 p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl  mb-4">Add User</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type:</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 border p-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
