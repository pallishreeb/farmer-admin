import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllBuyers } from '../api'; // Import the getAllBuyers and deleteUser functions from api.js
import { SideNavbar, TopNavbar } from '../components/Navbar';

const BuyersPage = () => {
  const [buyers, setBuyers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const { result } = await getAllBuyers(token);
      setBuyers(result);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await deleteUser(token, id);
      // Refresh the list of buyers after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting buyer:', error);
    }
  };

  // Function to handle editing an user
  const onEdit = async (id) => {
    navigate(`/admin/edit-user/${id}`)
  };
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="container mx-auto mt-2 p-8 overflow-x-auto overflow-y-auto" style={{maxHeight:"100vh"}}>
          <h2 className="text-2xl mb-4">Buyers</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post-Office</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zipcode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buyers?.map((buyer) => (
                <tr key={buyer._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer?.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.postOffice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.zipCode}</td>
                  <td className="text-left">

                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={() => onEdit(buyer._id)}
                    >
                      &#x270E;
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(buyer._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyersPage;
