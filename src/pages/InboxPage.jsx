// InboxPage.jsx

import React, { useEffect, useState } from 'react';
import { getMessagesForAdmin } from '../api';
import { SideNavbar, TopNavbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

const InboxPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const data = await getMessagesForAdmin(token);
        // console.log(data)
        setMessages(data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  return (
<>
  <TopNavbar />
  <div className="flex">
    <SideNavbar />
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold mb-4">Inbox Queries</h1>
      <ul className="border border-gray-300 rounded-lg divide-y divide-gray-300">
        {messages?.map((message) => (
          <li key={message._id} className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <span className="font-semibold">{message?.sender?.fullName} -  <span className="text-sm">{message?.sender?.userType}</span></span>
               
              </div>
              <span className="text-gray-600">&#x260E; {message?.sender?.phone}</span>
            </div>
            <Link to={`/admin/sender-messages/${message.sender?._id}`} className="font-semibold">
            <p className="italic">{message?.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
</>

  );
};

export default InboxPage;
