import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminBuyer from "../components/AdminBuyer";
import AdminSeller from "../components/AdminSeller";

function Admin() {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showSeller, setShowSeller] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false); // Initially show buyers or sellers based on your preference

  useEffect(() => {
    getSellers();
    getBuyers();
  }, []);

  const getSellers = async () => {
  
      const res = await axios.get("/api/seller");
      setSellers(res.data.sellers);
    
  };

  const getBuyers = async () => {
    
      const res = await axios.get("/api/buyer");
      setBuyers(res.data.buyers);
  
  };

  const displaySellers = () => {
    setShowSeller(true);
    setShowBuyer(false);
  };

  const displayBuyers = () => {
    setShowSeller(false);
    setShowBuyer(true);
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
       
        setBuyers(buyers.filter(buyer => buyer.buyerId !== buyerId));
    } catch (error) {
        console.error("Failed to delete buyer:", error);
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
      </div>
    </div>
  );
}

export default Admin;

