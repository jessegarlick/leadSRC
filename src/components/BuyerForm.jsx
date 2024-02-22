
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 


function BuyerForm() {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [homePhone, setHomePhone] = useState('')
    const [homeowner, setHomeowner] = useState('')
    const [streetName, setStreetName] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [monthlyRate, setMonthlyRate] = useState('')
    const [shade, setShade] = useState('')
    const [creditScore, setCreditScore] = useState('')




    const [sent, setSent] = useState(false)

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phone: phone, 
            homePhone: homePhone,
            homeowner: homeowner,
            streetName: streetName,
            streetNumber: streetNumber,
            city: city,
            state: state,
            zip: zip,
            monthlyRate: monthlyRate,
            shade: shade,
            creditScore: creditScore,
        }
        const res = await axios.post('/api/buyer/create', formData);
    
        if (res.data.message === 'new buyer created') {
            // navigate('/home');
            setSent(true)
        }
    };

  return sent ? (
    <div>Thanks for your submission!</div>
  ) : (
    <div className="form-container">
    
    <form className="buyer-form" onSubmit={handleSubmit}> 
    <header>
        <h1 className='yes'>Interested in solar?</h1>
    </header>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                placeholder="First Name"  
                // value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" 
            id="lastName" name="lastName" 
            placeholder="Last Name"  
            onChange={e => setLastName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" 
            id="email" name="email" 
            placeholder="Email" 
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" 
            id="phone" 
            name="phone" 
            placeholder="Phone Number" 
            onChange={e => setPhone(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Secondary Phone Number</label>
            <input type="text" 
            id="homePhone" 
            name="secondary number" 
            placeholder="Secondary Phone Number" 
            onChange={e => setHomePhone(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Are you a homeowner?</label>
            <input type="text" 
            id="homeowner" 
            name="homeowner" 
            placeholder="Homeowner" 
            onChange={e => setHomeowner(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Street Name</label>
            <input type="text" 
            id="streetName" 
            name="streetName" 
            placeholder="Street Name" 
            onChange={e => setStreetName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Street Number</label>
            <input type="text" 
            id="streetNumber" 
            name="streetNumber" 
            placeholder="Street Number" 
            onChange={e => setStreetNumber(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">City</label>
            <input type="text" 
            id="city" 
            name="city" 
            placeholder="City" 
            onChange={e => setCity(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">State</label>
            <input type="text" 
            id="state" 
            name="state" 
            placeholder="State" 
            onChange={e => setState(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Zip Code</label>
            <input type="text" 
            id="zip" 
            name="zip" 
            placeholder="Zip Code" 
            onChange={e => setZip(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">What is your monthly energy rate?</label>
            <input type="text" 
            id="monthlyRate" 
            name="monthlyRate" 
            placeholder="Energy Rate" 
            onChange={e => setMonthlyRate(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Do you have shade?</label>
            <input type="text" 
            id="shade" 
            name="shade" 
            placeholder="Shade" 
            onChange={e => setShade(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Is your credit score above 640?</label>
            <input type="text" 
            id="creditScore" 
            name="creditScore" 
            placeholder="Credit Score" 
            onChange={e => setCreditScore(e.target.value)}
            />
        </div>
        <button type="submit" >Submit</button>
    </form>
    </div>
  );
}

export default BuyerForm;