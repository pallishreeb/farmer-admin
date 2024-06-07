import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSellTradeById, updateSellTrade, getCategoryByParent } from '../api'; // Import the getCategoryByParent function from api.js
import { SideNavbar, TopNavbar } from '../components/Navbar';


const EditSellTradePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sellTradeData, setSellTradeData] = useState({
    price: '',
    quantity: '',
    pickuplocation: '',
    category: '',
    product: '',
    variety: '',
    grade: '',
    availableFromDate: '',
    availableToDate: ''
  });
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Add leading zero for single-digit months and days
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getSellTradeById(token, id);
        // console.log(response.result)
        const { result } = response;
        // Ensure date fields are formatted correctly
        const formattedData = {
          ...result,
          availableFromDate: formatDate(result.availableFromDate),
          availableToDate: formatDate(result.availableToDate)
        };
        setSellTradeData(formattedData);
      } catch (error) {
        console.error('Error fetching sell trade:', error);
        toast.error('Failed to fetch sell trade data');
      }
    };

    fetchData();

  }, [id,token]);
  useEffect(() => {
     
  const fetchProducts = async () =>{
    console.log(sellTradeData?.category)
    const { result } = await getCategoryByParent(token,sellTradeData?.category);
    // console.log(result)
    setProducts(result);
   } 
   if(sellTradeData?.category){
     fetchProducts()
   }
  }, [sellTradeData?.category,token]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSellTradeData({ ...sellTradeData, category: selectedCategory });
  };


  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setSellTradeData({ ...sellTradeData, product: selectedProduct });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellTradeData({ ...sellTradeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("sellTradeData",sellTradeData)
      const token = localStorage.getItem('token');
      await updateSellTrade(token, id, sellTradeData);
      toast.success('Sell trade updated successfully');
      navigate('/admin/selltrades');
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
      <h2 className="text-2xl mb-4">Edit Auction Farming</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter price"
            name="price"
            value={sellTradeData.price}
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
            placeholder="Enter quantity"
            name="quantity"
            value={sellTradeData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
        </label>
        <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            value={sellTradeData.category}
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
          value={sellTradeData.product}
          onChange={handleProductChange}
        >
          {products.map(product => (
            <option key={product._id} value={product.name}>{product.name}</option>
          ))}
        </select>
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableFromDate">
            Available From Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="availableFromDate"
            type="date"
            name="availableFromDate"
            value={sellTradeData.availableFromDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableToDate">
            Available To Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="availableToDate"
            type="date"
            name="availableToDate"
            value={sellTradeData.availableToDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variety">
          Variety
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="variety"
            type="text"
            placeholder="Enter variety"
            name="variety"
            value={sellTradeData.variety}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
          Grade
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grade"
            type="text"
            placeholder="Enter grade"
            name="grade"
            value={sellTradeData.grade}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickuplocation">
          Pickup Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pickuplocation"
            type="text"
            placeholder="Enter pickuplocation"
            name="pickuplocation"
            value={sellTradeData.pickuplocation}
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

export default EditSellTradePage;
