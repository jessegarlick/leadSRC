import React, { useState } from "react";
import axios from "axios";

function AdminBuyer({ buyer, sellers, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...buyer });
  const [selectedSeller, setSelectedSeller] = useState("");

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSellerChange = (e) => {
    setSelectedSeller(e.target.value);
  };

  const deleteBuyer = async () => {
    try {
      await axios.delete(`/api/buyer/delete/${buyer.buyerId}`);
      onDelete(buyer.buyerId); 
    } catch (error) {
      console.error("Failed to delete buyer:", error);
    }
  };

  const updateBuyer = async () => {
    
      if (!selectedSeller) {
        alert("Please select a seller.");
        return;
      }
      await axios.put(`/api/buyer/update/${buyer.buyerId}`, {
        ...editData,
        sellerId: selectedSeller,
      });
      setIsEditing(false);
    
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={editData.fname}
                onChange={handleEditChange}
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={editData.lname}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cellPhone">Cell Phone</label>
              <input
                type="text"
                id="cellPhone"
                name="cellPhone"
                value={editData.cellPhone}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Cell Phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="homePhone">Home Phone</label>
              <input
                type="text"
                id="homePhone"
                name="homePhone"
                value={editData.homePhone}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Home Phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={editData.streetAddress}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Street Address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={editData.city}
                onChange={handleEditChange}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={editData.state}
                onChange={handleEditChange}
                className="form-control"
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={editData.zip}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Zip Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="homeowner">Homeowner</label>
              <select
                id="homeowner"
                name="homeowner"
                value={editData.homeowner}
                onChange={handleEditChange}
                className="form-control"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shade">Shade</label>
              <input
                type="text"
                id="shade"
                name="shade"
                value={editData.shade}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Shade"
              />
            </div>
            <div className="form-group">
              <label htmlFor="monthlyRate">Monthly Rate</label>
              <input
                type="text"
                id="monthlyRate"
                name="monthlyRate"
                value={editData.monthlyRate}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Monthly Rate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="creditScore">Credit Score</label>
              <input
                type="text"
                id="creditScore"
                name="creditScore"
                value={editData.creditScore}
                onChange={handleEditChange}
                className="form-control"
                placeholder="Credit Score"
              />
            </div>
            <div className="form-group">
              
              <select
                id="seller"
                name="seller"
                value={selectedSeller}
                onChange={handleSellerChange}
                className="form-control"
              >
                <option value="">Select Seller</option>
                { sellers.map((seller) => (
                  <option key={seller.sellerId} value={seller.sellerId}>
                   {seller.sellerId} {seller.firstName} {seller.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button onClick={updateBuyer} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">
              {buyer.fname} {buyer.lname}
            </h5>
            <p>Email: {buyer.email}</p>
            <p>Cell Phone: {buyer.cellPhone}</p>
            <p>Home Phone: {buyer.homePhone}</p>
            <p>Street Address: {buyer.streetAddress}</p>
            <p>City: {buyer.city}</p>
            <p>State: {buyer.state}</p>
            <p>Zip Code: {buyer.zip}</p>
            <p>Homeowner: {buyer.homeowner ? "Yes" : "No"}</p>
            <p>Shade: {buyer.shade}</p>
            <p>Monthly Rate: {buyer.monthlyRate}</p>
            <p>Credit Score: {buyer.creditScore}</p>
            <p> {buyer.sellerName}</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit
              </button>
              <button onClick={deleteBuyer} className="btn btn-danger">
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminBuyer;
