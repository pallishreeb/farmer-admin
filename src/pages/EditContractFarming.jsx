import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  getCategoryByParent, updateContractFarming,getcontractFarmingById } from '../api'; // Import the getCategoryByParent function from api.js
import { SideNavbar, TopNavbar } from '../components/Navbar';


const EditContractFarming = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractFarming, setContractFarming] = useState({
    quantity: '',
    quality:'',
    location: '',
    category: '',
    commodity: '',
    deliveryTime: '',
    price: '',
    priceQuantityUnit: '',
  });
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getcontractFarmingById(token, id);
        const farmingRequest = response.farmingRequest;
        setContractFarming({
          ...farmingRequest,
          deliveryTime: formatDate(farmingRequest.deliveryTime),
        });
      } catch (error) {
        console.error('Error fetching contract farming data:', error);
        toast.error('Failed to fetch contract farming data');
      }
    };

    fetchData();
  }, [id, token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { result } = await getCategoryByParent(token, contractFarming.category);
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    };

    if (contractFarming.category) {
      fetchProducts();
    }
  }, [contractFarming.category, token]);
  
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setContractFarming({ ...contractFarming, category: selectedCategory });
  };

  
  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setContractFarming({ ...contractFarming, commodity: selectedProduct });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractFarming({ ...contractFarming, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("sellTradeData",contractFarming)
      const token = localStorage.getItem('token');
      await updateContractFarming(token, id, contractFarming);
      toast.success('Sell trade updated successfully');
      navigate('/admin/contract-farming');
    } catch (error) {
      console.error('Error updating sell trade:', error);
      toast.error('Failed to update sell trade. Please try again.');
    }
  };

  return (
    <div>
    <TopNavbar/>
    <div className="flex">
      <SideNavbar/>
    <div className="container mx-auto mt-2 p-8">
      <h2 className="text-2xl mb-4">Edit Contract Farming</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
        </label>
        <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            value={contractFarming.category}
            onChange={handleCategoryChange}
        >
            <option value="">Select a category</option>
            <option value="Crops">Crops</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
        </select>
        </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
          Product
        </label>
        <select
          id="product"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={contractFarming.commodity}
          onChange={handleProductChange}
        >
          {products.map(product => (
            <option key={product._id} value={product.name}>{product.name}</option>
          ))}
        </select>
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryTime">
            Delivery Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deliveryTime"
            type="date"
            name="deliveryTime"
            value={contractFarming.deliveryTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            name="location"
            value={contractFarming.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
          Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="text"
            name="quantity"
            value={contractFarming.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quality">
          Quality
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quality"
            type="text"
            name="quality"
            value={contractFarming.quality}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            name="price"
            value={contractFarming.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceQuantityUnit">
          Price Quantity Unit
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priceQuantityUnit"
            type="text"
            name="priceQuantityUnit"
            value={contractFarming.priceQuantityUnit}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Sell Trade
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EditContractFarming;
