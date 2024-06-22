import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png"

function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Redirect to the login page after logout
  };
  return (
    <nav className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17">
          {/* Logo */}
          <div className="flex-shrink-0 mt-2">
            <img className="h-10 w-16" src={logo} alt="Logo" />
            Agri Admin
          </div>

          {/* Navigation links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="bg-green-400 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>
                Logout
              </a>            
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button type="button" className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* <!-- Heroicon name: menu --> */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="bg-green-400 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Dashboard
          </a>
          <a href="#" className="bg-green-400 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Team
          </a>
          <a href="#" className="bg-green-400 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Projects
          </a>
          <a href="#" className="bg-green-400 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Calendar
          </a>
        </div> */}
      </div>
    </nav>
  );
}

function SideNavbar() {
  return (
    <div className="bg-gray-100 h-screen w-72">
      {/* Your sidebar content goes here */}
      <div className="px-2 py-4 text-balck">
        {/* <h2 className="text-xl font-semibold">Admin</h2> */}
        <ul className="mt-4">
          <li>
            <a href="/admin/dashboard" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="/admin/adduser" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Add Users</a>
          </li>
          <li>
            <a href="/admin/farmers" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Farmers</a>
          </li>
          <li>
            <a href="/admin/buyers" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Buyers</a>
          </li>
          <li>
            <a href="/admin/categories" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Categories</a>
          </li>
          <li>
            <a href="/admin/selltrades" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Auction Farming</a>
          </li>
          <li>
            <a href="/admin/contract-farming" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Contract Farming</a>
          </li>
          <li>
            <a href="/admin/orders" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Orders</a>
          </li>
          <li>
            <a href="/admin/queries" className="block px-4 py-2 text-lg text-gray-800 hover:bg-green-400 hover:text-white">Query Messages</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { TopNavbar, SideNavbar };
