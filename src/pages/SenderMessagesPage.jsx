// SenderMessagesPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { getMessagesForUser,sendMessage,deleteMessage } from '../api';
import { SideNavbar, TopNavbar } from '../components/Navbar';
import { toast } from 'react-toastify';

const SenderMessagesPage = () => {
  const { userId } = useParams();
  const  navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await getMessagesForUser(token,userId);
        // console.log(response)
        setMessages(response?.queries);
        setUser(response?.user[0])
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const receiver = localStorage.getItem('agri_user_id');
        let msg = {
            sender:receiver,
            receiver:userId,
            text:newMessage,
            token:token
        }
      await sendMessage(msg);
      // Refresh messages after posting a new message
      const response = await getMessagesForUser(token,userId);
      setMessages(response?.queries);
      // Clear input field
      setNewMessage('');
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleDelete = async (messageId) => {
    try {
        const token = localStorage.getItem('token');
      // Call the deleteMessage function with the message ID
      await deleteMessage(messageId,token);
      toast.success("Message deleted successfully!",{position:"top-right"});
      // Update the state of the messages to reflect
      const response = await getMessagesForUser(token,userId);
      setMessages(response?.queries);
      // Optionally, you can handle success or update UI accordingly
    } catch (error) {
        toast.error("Failed deleting message");
      // Handle error (e.g., display error message to the user)
      console.error('Error deleting message:', error);
    }
  };
  return (
    <>
    <TopNavbar />
    <div className="flex">
      <SideNavbar />
      <div className="container mx-auto p-2">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={message._id}
                className={`chat-message ${message.sender === userId ? 'user' : 'admin'}`}
              >
                <div className="message-text">{message.text}</div>
                <div className="message-info">
                {message.sender === userId ? user?.fullName : 'admin'} - {new Date(message.timestamp).toLocaleString()}
                {message.product && (
                  <div className="product-info">
                    <span className="product-name">Product Name -  {message.product.product}{","} ID - {message.product._id}  </span>
                    <br/>
                    <span className="product-price">Price - {message.product.price}</span> {" "}
                    <span className="product-price">quantity - {message.product.quantity}</span>
                    </div>
                )}
                {message.contractFarming && (
                  <div className="product-info">
                    <span className="product-name">Product Name -  {message.contractFarming.commodity}{","} ID - {message.contractFarming._id}  </span>
                    <br/>
                    {/* <span className="product-price">Price - {message.contractFarming.price}</span> {" "} */}
                    <span className="product-price">quantity - {message.contractFarming.quantity}</span>
                    </div>
                )}
                {message.contractFarming &&  <button onClick={() => navigate(`/admin/sender-messages/${message?.contractFarming.buyerId}`)} className="bg-green-500 p-1 rounded text-white float-end ml-2">Chat With Buyer</button>}
                {message.product &&  <button onClick={() => navigate(`/admin/sender-messages/${message.product?.farmer_id}`)} className="bg-green-500 p-1 rounded text-white float-end ml-2">Chat With Farmer</button>}
                <button onClick={() => handleDelete(message._id)} className="bg-red-500 p-1 rounded text-white float-end">Delete</button>
                </div>
              </div>
            ))}
          </div>

        </div>
        <form onSubmit={handleSubmit} className="message-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="submit-button">Reply</button>
          </form>
      </div>
    </div>
  </>

  );
};

export default SenderMessagesPage;
