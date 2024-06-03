import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { TopNavbar, SideNavbar } from '../components/Navbar';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
    <TopNavbar />
    <div className="flex">
      <SideNavbar />
      {/* Your main content goes here */}
      <div className="container mx-auto">
      <div className="flex items-center justify-center mt-12">
      <div className="max-w-3xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Admin Dashboard</h1>
        <p className="text-lg text-center mb-8">Manage your platform efficiently with our user-friendly admin dashboard.</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => navigate('/admin/selltrades')}>
            View Auction Farming
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => navigate('/admin/contract-farming')}>
          View Contract Farmings
          </button>
          <button className="bg-gray-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/admin/categories')}>
            Manage Categories
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
  )
}

export default Home