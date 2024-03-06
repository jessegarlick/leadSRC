import React, { useState } from "react";
import axios from "axios";

function AdminSeller({ seller, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...seller });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  
  const deleteSeller = async () => {
   
      await axios.delete(`/api/seller/delete/${seller.sellerId}`);
      alert("Seller deleted successfully");
      onDelete(seller.sellerId);
      };

  const updateSeller = async () => {
     await axios.put(`/api/seller/update/${seller.sellerId}`, editData);
      setIsEditing(false);
      
    }
  

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editData.firstName}
              onChange={handleEditChange}
              className="form-control mb-2"
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editData.lastName}
              onChange={handleEditChange}
              className="form-control mb-2"
              placeholder="Last Name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="form-control mb-2"
              placeholder="Email"
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              className="form-control mb-2"
              placeholder="Phone"
            />
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={editData.company}
              onChange={handleEditChange}
              className="form-control mb-2"
              placeholder="Company"
            />
            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button onClick={updateSeller} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">
              {seller.firstName} {seller.lastName}
            </h5>
            <p>Email: {seller.email}</p>
            <p>Phone: {seller.phone}</p>
            <p>Company: {seller.company}</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit
              </button>
              <button onClick={deleteSeller} className="btn btn-danger">
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminSeller;
