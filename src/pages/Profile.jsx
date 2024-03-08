import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../index.css";
import "./project.css";
import { CSVLink } from "react-csv";

function Profile() {
  const sellerId = useSelector((state) => state.sellerId);
  const [buyers, setBuyers] = useState([]);
  const [seller, setSeller] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (sellerId) {
        try {
          const sellerResponse = await axios.get(`/api/seller/${sellerId}`);
          setSeller(sellerResponse.data);

          const buyersResponse = await axios.get(
            `/api/profile?sellerId=${sellerId}`
          );
          setBuyers(buyersResponse.data);

          // Fetch messages for the seller
          const messagesResponse = await axios.get(
            `/api/messages?sellerId=${sellerId}`
          );
          console.log(messagesResponse.data);
          setMessages(messagesResponse.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [sellerId]);

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/seller/update-credentials/${sellerId}`, {
        username,
        password,
      });
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Failed to update credentials", error);
      alert("Failed to update credentials");
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post("/api/message/send", {
        senderId: sellerId,
        receiverId: 1, // Assuming admin's receiverId is fixed or known
        messageContent: newMessage,
      });
      setNewMessage("");
      // Refresh messages list after sending a message
      const messagesResponse = await axios.post(
        `/api/messages?sellerId=${sellerId}`
      );
      setMessages(messagesResponse.data.data);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="process-container">
      <h1>Welcome {seller.firstName}</h1>
      <div>
        {/* Display received messages */}
        {messages && messages.map((msg, index) => {
  // Check if the message is sent by the admin (senderId = 1)
  if (msg.senderId === 1) {
    return <p key={index}>{msg.content}</p>;
  } else {
    return null; // Skip rendering for non-admin messages
  }
})}
      </div>
      {/* Form for sending messages */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        ></textarea>
        <button type="submit">Send</button>
      </form>
      <div>
        {/* Rest of the profile content */}
        {buyers.map((buyer) => (
          <div key={buyer.buyerId} className="card">
            <div className="card-body">
              <p className="card-title">
                {buyer.fname} {buyer.lname}
              </p>
              <p className="card-text">
                Address: {buyer.streetAddress}, {buyer.city}, {buyer.state},{" "}
                {buyer.zip}
              </p>
              <p className="card-text">
                Phones: {buyer.cellPhone}, {buyer.homePhone}
              </p>
              <p className="card-text">Email: {buyer.email}</p>
              <p className="card-text">
                Homeowner: {buyer.homeowner ? "Yes" : "No"}
              </p>
              <p className="card-text">Shade: {buyer.shade}</p>
              <p className="card-text">Monthly Rate: {buyer.monthlyRate}</p>
              <p className="card-text">Credit Score: {buyer.creditScore}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleUpdateCredentials} className="form-container">
        {/* Update credentials form */}
      </form>
      {/* Export to CSV button */}
      <CSVLink data={buyers} filename="../assets/buyers.csv">
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default Profile;
