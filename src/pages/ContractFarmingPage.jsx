import React, { useEffect, useState } from 'react';
import { getAllContractFarmingRequests, approveFarmingRequest, deleteContractFarmingRequest,url } from '../api';
import { SideNavbar, TopNavbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ContractFarmingPage = () => {
  const [farmingRequests, setFarmingRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { contractFarmingRequests } = await getAllContractFarmingRequests(token);
      // console.log(contractFarmingRequests)
      setFarmingRequests(contractFarmingRequests);
    } catch (error) {
      console.error('Error fetching farming requests:', error);
    }
  };

  const handleApprove = async (farmingRequestId) => {
    try {
      const token = localStorage.getItem('token');
      await approveFarmingRequest(token, farmingRequestId);
      // Update the status of the approved request locally
      setFarmingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === farmingRequestId ? { ...request, approved: true } : request
        )
      );
      fetchData();
    } catch (error) {
      console.error('Error approving farming request:', error);
    }
  };

  const onEdit = (id) => {
    navigate(`/admin/edit-contract-farming/${id}`);
  };

    // Function to handle deleting a category
    const handleDeleteContractFarming = async (farmingRequestId) => {
        try {
          const token = localStorage.getItem('token'); // Get the token from local storage
          await deleteContractFarmingRequest(token, farmingRequestId);
          fetchData(); // Refetch categories after deleting
        } catch (error) {
          console.error('Error deleting selltrade:', error);
          // Handle error (e.g., show error message to user)
        }
      };
  return (
    <div>
    <TopNavbar />
    <div className="flex">
      <SideNavbar />
    <div className="container mx-auto mt-2 p-8 overflow-x-auto overflow-y-auto" style={{maxHeight:"100vh"}}>
      <h2 className="text-2xl mb-4">Contract Farmings</h2>
      <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contract Farming ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quoted Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyer 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approve
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmingRequests?.map((request) => (
                <tr key={request._id}>
                   <td className="px-2 py-4 whitespace-nowrap">
                   <a href={`${url}/${request?.image[0]}`} target="_blank" rel="noopener noreferrer">
                   <img src={`${url}/${request?.image[0]}`} alt='img' className='w-12 h-12' />
                </a>
              </td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.contractFarmingId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.commodity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.basePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.priceQuantityUnit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.quality}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.location}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">{request.buyerId?.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.buyerId?.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request?.deliveryTime}</td>
                  <td className="text-left py-3 px-2">
                  {request.isApproved ? <button
                        className="bg-green-500  text-white font-bold py-2 px-2 mr-2 rounded"
                      >
                        Approved
                      </button> :  <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                        onClick={() => handleApprove(request._id)}
                      >
                        Approve
                      </button>}
                  
                  </td>
                  <td className="flex flex-row py-3 px-2">
                  
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={() => onEdit(request._id)}
                    >
                      &#x270E;
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteContractFarming(request._id)}
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

export default ContractFarmingPage;
