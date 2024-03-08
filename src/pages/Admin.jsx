import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminBuyer from "../components/AdminBuyer";
import AdminSeller from "../components/AdminSeller";

function Admin() {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showSeller, setShowSeller] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sellersResponse = await axios.get("/api/seller");
      setSellers(sellersResponse.data.sellers);

      const buyersResponse = await axios.get("/api/buyer");
      setBuyers(buyersResponse.data.buyers);

      // Fetch messages for the selected seller
      if (selectedSeller) {
        const messagesResponse = await axios.get(
          `/api/messages?sellerId=${selectedSeller}`
        );
        setMessages(messagesResponse.data);
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
    try {
      await axios.post("/api/message/send", {
        senderId: "sellerId",
        receiverId: selectedSeller,
        messageContent: newMessage,
      });
      setNewMessage("");
      fetchMessages(selectedSeller);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleSelectSeller = (e) => {
    const selectedSellerId = e.target.value;
    console.log("Selected Seller ID:", selectedSellerId); // Add this line
    setSelectedSeller(selectedSellerId);
    if (selectedSellerId) {
      fetchMessages(selectedSellerId);
    } else {
      setMessages([]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="text-center">***Admin Page***</h1>
          <div
            className="btn-group d-flex justify-content-center"
            role="group"
            aria-label="Admin tabs"
          >
            <button
              type="button"
              className={`btn btn-outline-primary ${showBuyer ? "active" : ""}`}
              onClick={displayBuyers}
            >
              Show Buyers
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${
                showSeller ? "active" : ""
              }`}
              onClick={displaySellers}
            >
              Show Sellers
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
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
        <div className="col">
          <h2>Messages</h2>
          <select value={selectedSeller} onChange={handleSelectSeller}>
            <option value="">Select a seller</option>
            {sellers.map((seller, index) => (
              <option key={index} value={seller.sellerId}>
                {seller.firstName} {seller.lastName}
              </option>
            ))}
          </select>
          <div>
            {/* Display received messages */}
            {messages &&
              messages.map((msg, index) => {
                // Check if the message is sent by the selected seller (senderId equals selectedSeller)
                if (msg.senderId === parseInt(selectedSeller)) {
                  return <p key={index}>{msg.content}</p>;
                } else {
                  return null; // Skip rendering for messages from other sellers
                }
              })}
            <form onSubmit={handleSendMessage}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here"
              ></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
