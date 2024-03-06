import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../index.css";

function ContactForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            firstName, 
            lastName, 
            email, 
            phone, 
            company,
        };
        try {
            const res = await axios.post('/api/seller/create', formData);
        
            if (res.data.message === 'new seller created') {
                setSent(true);
                
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            
        }
    };

    return sent ? (
        <div>Thanks for your submission!</div>
    ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="buyer-form">
            <header>
                <h2>Interested in purchasing leads?</h2>
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
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" 
                id="email" name="email" 
                placeholder="Email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
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
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" 
                id="company" 
                name="company" 
                placeholder="Company" 
                value={company}
                onChange={e => setCompany(e.target.value)}
                required
                />
            </div>
            <div className="navigation-buttons">
                <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </div>
    );
}

export default ContactForm;
