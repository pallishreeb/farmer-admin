import React, { useState, useEffect } from 'react';
import { CategoryTable, AddCategoryButton } from '../components/CategoryTable';
import { SideNavbar, TopNavbar } from '../components/Navbar';
import { getAllCategories, deleteCategory } from '../api'; // Import the API functions
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
const navigate = useNavigate()
  // Function to fetch all categories from the API
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await getAllCategories(token);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []); // Empty dependency array to run effect only once

  // Function to handle adding a new category
  const handleAddCategory = async () => {
    navigate('/admin/addcategory')
  };

  // Function to handle editing a category
  const handleEditCategory = async (categoryId) => {
    navigate(`/admin/editcategory/${categoryId}`)
  };

  // Function to handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      await deleteCategory(token, categoryId);
      fetchCategories(); // Refetch categories after deleting
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="container mx-auto mt-4 p-2">
        <div className='flex justify-between'>
        <h2 className="text-2xl mb-4">Categories</h2>
          <AddCategoryButton handleAddCategory={handleAddCategory} className="mt-8" />
        </div>
          <CategoryTable
            categories={categories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>
    </div>
  );
}

export default Categories;
