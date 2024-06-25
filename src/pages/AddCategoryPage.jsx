import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCategory } from '../api'; // Import the addCategory function from api.js
import { SideNavbar, TopNavbar } from '../components/Navbar';

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    parentCategory: '',
    name: '',
    unit: '',
    price: '',
    grade: '',
    variety: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleVarietyChange = (index, value) => {
    const newVariety = [...categoryData.variety];
    newVariety[index] = value;
    setCategoryData({ ...categoryData, variety: newVariety });
  };

  const addVarietyInput = () => {
    setCategoryData({ ...categoryData, variety: [...categoryData.variety, ''] });
  };

  const removeVarietyInput = (index) => {
    const newVariety = categoryData.variety.filter((_, i) => i !== index);
    setCategoryData({ ...categoryData, variety: newVariety });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await addCategory(token, categoryData);
      toast.success('Category added successfully');
      navigate('/admin/categories'); // Redirect to the categories page after adding a category
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category. Please try again.');
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="container mx-auto mt-2 p-8">
          <h2 className="text-2xl mb-4">Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentCategory">
                Parent Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="parentCategory"
                name="parentCategory"
                value={categoryData.parentCategory}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Fruits">Fruits</option>
                <option value="Crops">Crops</option>
                <option value="Vegetables">Vegetables</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter category name"
                name="name"
                value={categoryData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                Unit
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="unit"
                type="text"
                placeholder="Enter unit"
                name="unit"
                value={categoryData.unit}
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
                placeholder="Enter price"
                name="price"
                value={categoryData.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
                Grade
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="grade"
                name="grade"
                value={categoryData.grade}
                onChange={handleChange}
              >
                <option value="">Select a grade</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variety">
                Variety
              </label>
              {categoryData.variety.map((variety, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`variety-${index}`}
                    type="text"
                    placeholder={`Enter variety ${index + 1}`}
                    value={variety}
                    onChange={(e) => handleVarietyChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => removeVarietyInput(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addVarietyInput}
              >
                + Add Variety
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
