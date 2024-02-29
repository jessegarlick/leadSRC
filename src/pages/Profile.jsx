import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'


function Profile() {
  const [data, setData] = useState({buyers: []})
  const id = useSelector(state => state.userId)
  console.log('profile id', id)

  const getData = async () => {
    let res = await axios.get('/api/profile')
    console.log(res.data)
    setData(res.data.data)
  }

  useEffect(() => {
    getData()
  }, [])
  
  const buyerCard = (buyer) => {
    return (
      <div key={buyer.buyerId}>
        
        <h1>{buyer.fname}</h1>
        <h1>{buyer.lname}</h1> 
        <p>{buyer.streetName}</p> 
        <p>{buyer.streetNumber}</p>
        <p>{buyer.state}</p>
        <p>{buyer.city}</p>
        <p>{buyer.zip}</p>
        <p>{buyer.cellPhone} </p>
        <p>{buyer.homePhone}</p>
        <p>{buyer.email}</p>
        <p>{buyer.homeowner}</p>
        <p>{buyer.shade}</p>
        <p>{buyer.monthlyRate}</p>
        <p>{buyer.creditScore} </p>
      </div>
    )
  }
  const allBuyers = data.buyers.map((buyer) => {
    console.log(buyer)
  return (
     buyerCard(buyer)
    )
  })
  
  return (
    
    <div>
      <h1>Welcome {data.username} </h1>
      {allBuyers}
      </div>
    
  ) 
  
  
}
export default Profile
