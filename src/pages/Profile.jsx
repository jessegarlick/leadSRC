import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CSVLink } from "react-csv";
import "./css/profile.css"

function Profile() {
  const sellerId = useSelector((state) => state.sellerId);
  const [buyers, setBuyers] = useState([]);
  const [seller, setSeller] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageToDelete, setMessageToDelete] = useState("");

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

          const messagesResponse = await axios.get(
            `/api/messages?sellerId=${sellerId}`
          );
          setMessages(messagesResponse.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [sellerId, messageToDelete]);

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
        receiverId: 2,
        messageContent: newMessage,
      });
      setNewMessage("");
      const messagesResponse = await axios.get(
        `/api/messages?sellerId=${sellerId}`
      );
      setMessages(messagesResponse.data);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`/api/message/${messageId}`);

      setMessages(messages.filter((msg) => msg.messageId !== messageId));
    } catch (error) {
      console.error("Failed to delete message", error);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="profile-message-container">
      <div className="profile-header">
        <h1 className="profile-title">Welcome {seller.firstName}</h1>
      </div>
      <div>
        {/* Display buyers */}
        {buyers.map((buyer) => (
          <div key={buyer.buyerId} className="buyer-card">
            <h3>Solar Lead:</h3>
            <p>First Name: {buyer.fname}</p>
            <p>Last Name: {buyer.lname}</p>
            <p>
              Address: {buyer.streetAddress}, {buyer.city}, {buyer.state}, {buyer.zip}
            </p>
            <p>
              Phones: {buyer.cellPhone}, {buyer.homePhone}
            </p>
            <p>Email: {buyer.email}</p>
            <p>Homeowner: {buyer.homeowner ? "Yes" : "No"}</p>
            <p>Shade: {buyer.shade}</p>
            <p>Monthly Rate: {buyer.monthlyRate}</p>
            <p>Credit Score: {buyer.creditScore}</p>
          </div>
        ))}
      </div>
      <div className="profile-button-container">
        {messages
          .filter((msg) => msg.senderId === 1 && msg.receiverId === 2)
          .map((msg, index) => (
            <div key={index} className="profile-message-container">
              <p>Message: {msg.content}</p>
              <button
                className="btn-primary"
                type="button"
                onClick={() => handleDeleteMessage(msg.messageId)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      <form
        className="profile-message-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <h2>Message Admin:</h2>
        <textarea
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        ></textarea>
        <button className="btn-primary" type="submit">
          Send
        </button>
      </form>

      <form className="profile-credentials-form">
        <label>
          Username:
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="btn-primary"
          type="submit"
          onClick={handleUpdateCredentials}
        >
          Update Credentials
        </button>
      </form>
      <CSVLink data={buyers} filename="buyers.csv" className="btn-primary">
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default Profile;
