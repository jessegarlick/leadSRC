import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 


function ContactForm() {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')

    const [sent, setSent] = useState(false)

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phone: phone, 
            company: company,
        }
        const res = await axios.post('/api/seller/create', formData);
    
        if (res.data.message === 'new seller created') {
            // navigate('/home');
            setSent(true)
        }
    };

  return sent ? (
    <div>Thanks for your submission!</div>
  ) : (
    <div className="form-container">
    
    <form className="full-width-form" onSubmit={handleSubmit}> 
    <header>
        <h1 className='yes'>Interested in purchasing leads?</h1>
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
            <label htmlFor="company">Company</label>
            <input type="text" 
            id="company" 
            name="company" 
            placeholder="Company" 
            onChange={e => setCompany(e.target.value)}
            />
        </div>
        <button type="submit" >Submit</button>
    </form>
    </div>
  );
}

export default ContactForm;
