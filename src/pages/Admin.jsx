import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminBuyer from "./components/AdminBuyer";
import AdminSeller from "./components/AdminSeller";
import "./css/admin.css"; 

function Admin() {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showSeller, setShowSeller] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, [messageToDelete]);

  const fetchData = async () => {
    try {
      const sellersResponse = await axios.get("/api/seller");
      setSellers(sellersResponse.data.sellers);

      const buyersResponse = await axios.get("/api/buyer");
      setBuyers(buyersResponse.data.buyers);

      if (selectedSeller) {
        fetchMessages(selectedSeller);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const displaySellers = () => {
    setShowSeller(true);
    setShowBuyer(false);
    setSelectedSeller("");
  };

  const displayBuyers = () => {
    setShowSeller(false);
    setShowBuyer(true);
    setSelectedSeller("");
  };

  const deleteSellerHandler = async (sellerId) => {
    try {
      setSellers(sellers.filter((seller) => seller.sellerId !== sellerId));
    } catch (error) {
      console.error("Failed to delete seller:", error);
    }
  };

  const deleteBuyerHandler = async (buyerId) => {
    try {
      setBuyers(buyers.filter((buyer) => buyer.buyerId !== buyerId));
    } catch (error) {
      console.error("Failed to delete buyer:", error);
    }
  };

  const fetchMessages = async (sellerId) => {
    try {
      const response = await axios.get(`/api/messages?sellerId=${sellerId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      console.error("Message content cannot be empty");
      return;
    }
    try {
      await axios.post("/api/message/send", {
        senderId: 1, 
        receiverId: selectedSeller,
        messageContent: newMessage,
      });
      setNewMessage("");
      
      fetchMessages(selectedSeller);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleSelectSeller = async (e) => {
    const selectedSellerId = e.target.value;
    console.log("Selected Seller ID:", selectedSellerId);
    setSelectedSeller(selectedSellerId);
    if (selectedSellerId) {
      try {
        const messagesResponse = await axios.get(
          `/api/messages?sellerId=${selectedSellerId}`
        );
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    } else {
      setMessages([]);
    }
  };
  const handleDeleteMessage = async (messageId) => {
    console.log("Deleting message with ID:", messageId);
    try {
      await axios.delete(`/api/message/${messageId}`);
      setMessages(messages.filter((msg) => msg.messageId !== messageId));
    } catch (error) {
      console.error("Failed to delete message", error);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="admin-container">
      <div>
        <div className="admin-header">
          <h1 className="admin-title">ADMIN</h1>
          <div
            className="button-container"
            role="group"
            aria-label="Admin tabs"
          >
            <button
              type="button"
              className={`btn-outline-primary ${showBuyer ? "active" : ""}`}
              onClick={displayBuyers}
            >
              Show Buyers
            </button>
            <button
              type="button"
              className={`btn-outline-primary ${showSeller ? "active" : ""}`}
              onClick={displaySellers}
            >
              Show Sellers
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {showSeller && (
            <div className="admin-section">
              {sellers.map((seller, index) => (
                <AdminSeller
                  key={index}
                  seller={seller}
                  onSelect={() => {
                    setSelectedSeller(seller.sellerId);
                    fetchMessages(seller.sellerId);
                  }}
                  onDelete={deleteSellerHandler}
                />
              ))}
            </div>
          )}
          {showBuyer && (
            <div className="admin-section">
              {buyers.map((buyer, index) => (
                <AdminBuyer
                  key={index}
                  buyer={buyer}
                  sellers={sellers}
                  onDelete={deleteBuyerHandler}
                />
              ))}
            </div>
          )}
        </div>
        <div className="col-content">
          <h2 className="admin-title">Messages</h2>
          <select
            className="form-control"
            value={selectedSeller}
            onChange={handleSelectSeller}
          >
            <option value="">Select a seller</option>
            {sellers.map((seller, index) => (
              <option key={index} value={seller.sellerId}>
                {seller.firstName} {seller.lastName}
              </option>
            ))}
          </select>
          <div className="admin-message-container">
            {/* display received messages */}
            {messages &&
              messages.map((msg, index) => {
                if (msg.senderId.toString() === selectedSeller.toString()) {
                  return (
                    <div key={index} className="message-container">
                      <p>Message: {msg.content}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMessage(msg.messageId)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                } else {
                  return null;
                }
              })}

            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                className="form-control"
                name="messageContent"
                id="messageContent"
                value={newMessage || ""}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here"
              />
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
