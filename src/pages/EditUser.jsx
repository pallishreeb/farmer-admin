// EditUser.jsx

import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { updateUserProfile, getUserDetails } from '../api'; // Import API functions
import { SideNavbar, TopNavbar } from '../components/Navbar';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL params
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    address: '',
    village: '',
    postOffice: '',
    tehsil: '',
    taluka: '',
    zipCode: '',
    state: '',
    firmName: '',
    firmAddress: '',
    location: '',
    phone: '',
    profilePicture: null,
    userType: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(id); // Fetch user details
        // console.log(userDetails)
        setFormData(userDetails?.data); // Set form data with fetched details
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setErrorMessage('Failed to fetch user details. Please try again later.');
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(id, formData); // Update user profile
      // console.log('User profile updated successfully');
      navigate(-1)
    } catch (error) {
      console.error('Failed to update user profile:', error);
      setErrorMessage('Failed to update user profile. Please try again later.');
    }
  };

  return (
    <>
    <TopNavbar />
    <div className="flex">
      <SideNavbar />
      <div className="container mx-auto mt-2 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Edit {formData?.userType} Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="village">village:</label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="postOffice">postOffice:</label>
          <input
            type="text"
            id="postOffice"
            name="postOffice"
            value={formData.postOffice}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="tehsil">tehsil:</label>
          <input
            type="text"
            id="tehsil"
            name="tehsil"
            value={formData.tehsil}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="taluka">taluka:</label>
          <input
            type="text"
            id="taluka"
            name="taluka"
            value={formData.taluka}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="zipCode">zipCode:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="state">state:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="firmName">firmName:</label>
          <input
            type="text"
            id="firmName"
            name="firmName"
            value={formData.firmName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="location">location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="phone">phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="userType">userType:</label>
          <select
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            className="mt-1 border p-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
          </select>
        </div>
        {/* Add other profile fields here */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-4">
          <button
          type="submit"
          className=" mt-1 p-2 inline-flex  items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
        Save Changes
        </button>
       </div>
       </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default EditUser;
