import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Profile() {
  const sellerId = useSelector(state => state.sellerId); // Adjust based on your actual state structure
  const [buyers, setBuyers] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (sellerId) {
       
          
          const sellerResponse = await axios.get(`/api/seller/${sellerId}`);
          setSeller(sellerResponse.data);

          
          const buyersResponse = await axios.get(`/api/profile?sellerId=${sellerId}`);
          setBuyers(buyersResponse.data);
        
      }
    };

    fetchData();
  }, [sellerId]);

  const buyerCard = (buyer) => (
    <div key={buyer.buyerId} className="buyer-card">
      <h2>{buyer.fname} {buyer.lname}</h2>
      <p>Address: {buyer.streetAddress}, {buyer.city}, {buyer.state} {buyer.zip}</p>
      <p>Phones: {buyer.cellPhone}, {buyer.homePhone}</p>
      <p>Email: {buyer.email}</p>
      <p>Homeowner: {buyer.homeowner ? 'Yes' : 'No'}</p>
      <p>Shade: {buyer.shade}</p>
      <p>Monthly Rate: {buyer.monthlyRate}</p>
      <p>Credit Score: {buyer.creditScore}</p>
    </div>
  );

  return (
    <div className="profile-container">
      <h1>Welcome {seller ? seller.firstName : 'Loading seller...'}</h1>
      <div className="buyers-container">
        {buyers.length > 0 ? buyers.map(buyerCard) : <p>Loading buyers...</p>}
      </div>
    </div>
  );
}

export default Profile;
