// api.js

import axios from 'axios';

// Set the base URL for all API requests
// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'http://172.105.35.214/api';

export const url =  'http://172.105.35.214'

// Function to handle admin login
export const adminLogin = async (phone, otp,password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post('/admin/login', { phone, otp, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to add a category
export const addCategory = async (token, categoryData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post('/category', categoryData, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a category by ID
export const deleteCategory = async (token, id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.delete(`/category/${id}`, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a category by ID
export const updateCategory = async (token, categoryId, updatedCategoryData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.put(`/category/${categoryId}`, updatedCategoryData, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get a category by name
export const getCategoryById = async (token, categoryId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`/category/${categoryId}`, {  headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get all categories
export const getAllCategories = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/category', { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get all sell trades
export const getAllSellTrades = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/selltrade/getselltrade', { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Function to delete a category by ID
export const deleteSellTrade = async (token, id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.delete(`/selltrade/delete/${id}`, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Function to get a sell trade by ID
export const getSellTradeById = async (token, sellTradeId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`/selltrade/getselltradebyid/${sellTradeId}`, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get categories by parent category
export const getCategoryByParent = async (token,parentCategory) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`/categoryByParent?name=${parentCategory}`,{
        headers: {
          'x-access-token': token
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Function to update sell trade by ID
export const updateSellTrade = async (token, id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.put(`/selltrade/update/${id}`, data, {
        headers: {
          'x-access-token': token
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
// Function to get all contract farming requests
export const getAllContractFarmingRequests = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/contract/allFarmingRequests', { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get a contract farming  by ID
export const getcontractFarmingById = async (token, farmingRequestId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`/contract/farmingRequest?farmingRequestId=${farmingRequestId}`, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to approve a farming request by ID
export const approveFarmingRequest = async (token, farmingRequestId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.put(`/contract/approveFarmingRequest/${farmingRequestId}`, null, { headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a contract farming request by ID
export const deleteContractFarmingRequest = async (token, farmingRequestId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.delete(`/contract/deleteFarmingRequestByAdmin?farmingRequestId=${farmingRequestId}`, {
            headers: { 'x-access-token': token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
  // Function to update contract farming  by ID
  export const updateContractFarming = async (token, id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.put(`/contract/updateFarmingRequest/${id}`, data, {
        headers: {
          'x-access-token': token
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Function to get all buyers
export const getAllBuyers = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/buyers',{ headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get all farmers
export const getAllFarmers = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/farmers',{ headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a user by ID
export const deleteUser = async (token,id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.delete(`/user/${id}`,{ headers: { 'x-access-token': token } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMessagesForAdmin = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get('/messages-for-admin',{ headers: { 'x-access-token': token }});

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getMessagesForUser = async (token,userId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`/messages-user/${userId}`,{ headers: { 'x-access-token': token }});
      return response.data;
    } catch (error) {
      throw error;
    }
  };


// Function to send a message
export const sendMessage = async ({sender, receiver, text,token}) => {
    try {
      const response = await axios.post('/message', {
        sender,
        receiver,
        text,
      },{ headers: { 'x-access-token': token }});
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to send message';
    }
  };

  // Function to delete a message by its ID
export const deleteMessage = async (messageId,token) => {
    try {
      // Send a DELETE request to the API endpoint with the message ID as a query parameter
      const response = await axios.delete(`/message?messageId=${messageId}`,{ headers: { 'x-access-token': token }});
      // Return the response data if the request is successful
      return response.data;
    } catch (error) {
      // Handle errors (e.g., display error message to the user)
      console.error('Error deleting message:', error);
      throw error; // Throw the error to handle it in the component
    }
  };

  // Function to update user profile
export const updateUserProfile = async (userId, userData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`/admin/update/${userId}`, userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error if request fails
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`/admin/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};


// Function to create an user
export const createUser = async ({phone,password,userType}) => {
  try {
    const response = await axios.post('/admin/register', {
      phone,
      password,
      userType
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Failed to create user';
  }
};

export const updatePassword = async (phone, newPassword) => {
  try {
    const response = await axios.put(`/admin/reset-password`, {
      phone,
      newpassword: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Failed to update password. Please try again later.';
  }
};

//get orders
export const fetchOrders = async (token) => {
  try {
    const response = await axios.get('/orders',{ headers: { 'x-access-token': token } });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const deleteOrder = async (token, orderId) => {
  await axios.delete(`/orders/${orderId}`, { headers: { 'x-access-token': token }});
};