import React, { useEffect, useState } from 'react';
import { deleteSellTrade, getAllSellTrades,url } from '../api'; // Import the getAllSellTrades function from api.js
import { SideNavbar, TopNavbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const SellTradePage = () => {
  const [sellTrades, setSellTrades] = useState([]);
const navigate = useNavigate()
  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const { result } = await getAllSellTrades(token);
      // console.log(result)
      setSellTrades(result);
    } catch (error) {
      console.error('Error fetching sell trades:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  // Function to handle deleting a category
  const handleDeleteSellTrade = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await deleteSellTrade(token, id);
      fetchData(); // Refetch categories after deleting
    } catch (error) {
      console.error('Error deleting selltrade:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  const onEdit = (id) =>{
    navigate(`/admin/edit-selltrade/${id}`)
  }
  return (
    <div>
    <TopNavbar />
    <div className="flex">
      <SideNavbar />
    <div className="container mx-auto mt-2 p-8 overflow-x-auto overflow-y-auto" style={{maxHeight:"100vh"}}>
      <h2 className="text-2xl mb-4">Auction Farming</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auction farming ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quoted Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Unit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variety</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            {/* Add other table headings as needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sellTrades.map((trade) => (
            <tr key={trade._id}>
               <td className="px-2 py-4 whitespace-nowrap">
               <a href={`${url}/${trade?.image[0]}`} target="_blank" rel="noopener noreferrer">
                <img src={`${url}/${trade?.image[0]}`} alt='img' className='w-12 h-12' />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{trade?.sellTradeId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.product}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.category}</td>        
              <td className="px-6 py-4 whitespace-nowrap">{trade.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade?.basePrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade?.priceQuantityUnit}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.variety}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.grade}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade?.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.farmer_id?.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.farmer_id?.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(trade?.availableToDate).toLocaleDateString()}</td>
              <td className="flex flex-row py-3 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => onEdit(trade?._id)}
                >
                   &#x270E;
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteSellTrade(trade?._id)}
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

export default SellTradePage;
