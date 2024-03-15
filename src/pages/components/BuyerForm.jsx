
import React, { useState } from 'react';
import axios from 'axios'
import "../css/forms.css";




function BuyerForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [firstName, setFirstName] = useState('Jesse');
  const [lastName, setLastName] = useState('Garlick');
  const [email, setEmail] = useState('jessegarlick11@gmail.com');
  const [phone, setPhone] = useState('801-358-7736');
  const [homePhone, setHomePhone] = useState('none');
  const [homeowner, setHomeowner] = useState('YES');
  const [streetAddress, setStreetAddress] = useState('952 E Parley Dr');
  
  const [city, setCity] = useState('Saratoga Springs');
  const [state, setState] = useState('UT');
  const [zip, setZip] = useState('84045');
  const [monthlyRate, setMonthlyRate] = useState('$154');
  const [shade, setShade] = useState('No');
  const [creditScore, setCreditScore] = useState('Yes');

  const [sent, setSent] = useState(false)
  
  
  const questions = [
    { label: "First Name", type: "text", name: "firstName", placeholder: "First Name", value: firstName, setter: setFirstName },
    { label: "Last Name", type: "text", name: "lastName", placeholder: "Last Name", value: lastName, setter: setLastName },
    { label: "Email", type: "email", name: "email", placeholder: "Email", value: email, setter: setEmail },
    { label: "Phone Number", type: "tel", name: "phone", placeholder: "Phone Number", value: phone, setter: setPhone },
    { label: "Secondary Phone Number", type: "text", name: "homePhone", placeholder: "Secondary Phone Number", value: homePhone, setter: setHomePhone },
    { label: "Are you a homeowner?", type: "text", name: "homeowner", placeholder: "Homeowner", value: homeowner, setter: setHomeowner },
    { label: "Street Address", type: "text", name: "streetAddress", placeholder: "Street Address", value: streetAddress, setter: setStreetAddress },
    { label: "City", type: "text", name: "city", placeholder: "City", value: city, setter: setCity },
    { label: "State", type: "text", name: "state", placeholder: "State", value: state, setter: setState },
    { label: "Zip Code", type: "text", name: "zip", placeholder: "Zip Code", value: zip, setter: setZip },
    { label: "What is your monthly energy rate?", type: "text", name: "monthlyRate", placeholder: "Energy Rate", value: monthlyRate, setter: setMonthlyRate },
    { label: "Do you have shade?", type: "text", name: "shade", placeholder: "Shade", value: shade, setter: setShade },
    { label: "Do you consent to be contacted?", type: "text", name: "creditScore", placeholder: "Credit Score", value: creditScore, setter: setCreditScore },
  ];

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion.value.trim()) {
      alert('Please fill out this field before proceeding.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      homePhone,
      homeowner,
      streetAddress,
    
      city,
      state,
      zip,
      monthlyRate,
      shade,
      creditScore,
    };

    try {
      const res = await axios.post('api/buyer/create', formData);
      if (res.data.message === 'New buyer created and email sent successfully.') {
        resetForm();
        setSent(true);
    } else {
        alert('Submission was successful, but the expected message was not received.');
    }
    
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  function resetForm() {
    setFirstName('test');
    setLastName('test');
    setEmail('test');
    setPhone('test');
    setHomePhone('test');
    setHomeowner('test');
    setStreetAddress('test');
   
    setCity('test');
    setState('test');
    setZip('test');
    setMonthlyRate('test');
    setShade('test');
    setCreditScore('test');
    setCurrentQuestionIndex(0); 
  }

  const currentQuestion = questions[currentQuestionIndex];

  return sent ? (
    <div>Thanks for your submission!</div>
  ) : (
    <div className="form-container">
      <form className="buyer-form">
        <header>
          <h2>Interested in solar?</h2>
        </header>
        <div className="form-group">
          <label htmlFor={currentQuestion.name}>{currentQuestion.label}</label>
          <input
            type={currentQuestion.type}
            id={currentQuestion.name}
            name={currentQuestion.name}
            placeholder={currentQuestion.placeholder}
            value={currentQuestion.value}
            onChange={e => currentQuestion.setter(e.target.value)}
          />
        </div>
        <div className="navigation-buttons">
          {currentQuestionIndex > 0 && (
            <button type="button" className="btn" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Previous
            </button>
          )}
          <button type="button" className="btn" onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyerForm;