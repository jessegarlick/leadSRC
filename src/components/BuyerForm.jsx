
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 


function BuyerForm() {
    
    const [firstName, setFirstName] = useState('Test')
    const [lastName, setLastName] = useState('Test')
    const [email, setEmail] = useState('Test@test.com')
    const [phone, setPhone] = useState('Test')
    const [homePhone, setHomePhone] = useState('test')
    const [homeowner, setHomeowner] = useState('test')
    const [streetName, setStreetName] = useState('test')
    const [streetNumber, setStreetNumber] = useState('test')
    const [city, setCity] = useState('test')
    const [state, setState] = useState('test')
    const [zip, setZip] = useState('test')
    const [monthlyRate, setMonthlyRate] = useState('test')
    const [shade, setShade] = useState('test')
    const [creditScore, setCreditScore] = useState('test')




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
        try {
            const res = await axios.post('/api/buyer/create', formData);
            console.log(res.data)
            if (res.data.message === 'new buyer created') {
                setSent(true);
                
                resetForm();
                // Uncomment the next line if navigation is desired after form submission
                // navigate('/home');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error (e.g., show an error message)
        }
    
        

    };
    function resetForm() {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setHomePhone('')
        setHomeowner('')
        setStreetName('')
        setStreetNumber('')
        setCity('')
        setZip('')
        setMonthlyRate('')
        setShade('')
        setCreditScore('')
    }


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
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
        />
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" 
            id="lastName" name="lastName" 
            placeholder="Last Name"
            value={lastName}  
            onChange={e => setLastName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" 
            id="email" name="email" 
            placeholder="Email"
            value={email} 
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" 
            id="phone" 
            name="phone" 
            placeholder="Phone Number"
            value={phone} 
            onChange={e => setPhone(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Secondary Phone Number</label>
            <input type="text" 
            id="homePhone" 
            name="secondary number" 
            placeholder="Secondary Phone Number"
            value={homePhone} 
            onChange={e => setHomePhone(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Are you a homeowner?</label>
            <input type="text" 
            id="homeowner" 
            name="homeowner" 
            placeholder="Homeowner"
            value={homeowner} 
            onChange={e => setHomeowner(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Street Name</label>
            <input type="text" 
            id="streetName" 
            name="streetName" 
            placeholder="Street Name"
            value={streetName} 
            onChange={e => setStreetName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Street Number</label>
            <input type="text" 
            id="streetNumber" 
            name="streetNumber" 
            placeholder="Street Number"
            value={streetNumber} 
            onChange={e => setStreetNumber(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">City</label>
            <input type="text" 
            id="city" 
            name="city" 
            placeholder="City" 
            value={city}
            onChange={e => setCity(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">State</label>
            <input type="text" 
            id="state" 
            name="state" 
            placeholder="State"
            value={state} 
            onChange={e => setState(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Zip Code</label>
            <input type="text" 
            id="zip" 
            name="zip" 
            placeholder="Zip Code"
            value={zip} 
            onChange={e => setZip(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">What is your monthly energy rate?</label>
            <input type="text" 
            id="monthlyRate" 
            name="monthlyRate" 
            placeholder="Energy Rate" 
            value={monthlyRate}
            onChange={e => setMonthlyRate(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="shade">Do you have shade?</label>
            <input type="text" 
            id="shade" 
            name="shade" 
            placeholder="Shade"
            value={shade} 
            onChange={e => setShade(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="homePhone">Is your credit score above 640?</label>
            <input type="text" 
            id="creditScore" 
            name="creditScore" 
            placeholder="Credit Score" 
            value={creditScore}
            onChange={e => setCreditScore(e.target.value)}
            />
        </div>
        <button type="submit" >Submit</button>
    </form>
    </div>
  );
}

export default BuyerForm;