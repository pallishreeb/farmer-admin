import React, { useState, useEffect } from 'react';
import { fetchOrders, deleteOrder,url } from '../api'; // Ensure you have deleteOrder function in your api.js
import { TopNavbar, SideNavbar } from '../components/Navbar';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchOrders(token)
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        await deleteOrder(token, orderId);
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-grow overflow-auto h-screen">
        <TopNavbar />
        <div className="container mx-auto mt-8 p-4">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
          <div className="overflow-x-auto overflow-y-auto" style={{maxHeight:"100vh"}}>
          <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="px-2 py-4 whitespace-nowrap">
                    <a href={`${url}/${order?.tradeId?.image[0]}`} target="_blank" rel="noopener noreferrer">
                        <img src={`${url}/${order?.tradeId?.image[0]}`} alt='img' className='w-12 h-12' />
                      </a>
                    </td>
                    <td className="py-2 px-2 border-b">{order?.orderId}</td>
                    <td className="py-2 px-2 border-b">{order?.tradeId?.product}</td>
                    <td className="py-2 px-2 border-b">{order?.tradeId?.price}</td>
                    <td className="py-2 px-2 border-b">{order?.tradeId?.basePrice}</td>
                    <td className="py-2 px-2 border-b">{order?.category}</td>
                    <td className="py-2 px-2 border-b">{order?.deliveryLocation}</td>
                    <td className="py-2 px-2 border-b">{order?.quality}</td>
                    <td className="py-2 px-2 border-b">{order?.quantity}</td>
                    <td className="py-2 px-2 border-b">{order?.deliveryTime}</td>
                    <td className="py-2 px-2 border-b">{order?.farmer_id?.fullName}</td>
                    <td className="py-2 px-2 border-b">{order?.farmer_id?.phone}</td>
                    <td className="py-2 px-2 border-b">{order?.buyerId?.fullName}</td>
                    <td className="py-2 px-2 border-b">{order?.buyerId?.phone}</td>
                    <td className="py-2 px-2 border-b">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
