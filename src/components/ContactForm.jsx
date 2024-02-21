

function ContactForm() {
 
  return (
    <div className="form-container">
    
    <form className="full-width-form" >
    <header>
        <h1 className='yes'>Interested in purchasing leads?</h1>
    </header>
        <div className="form-group">
            <label>First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name"  />
        </div>
        <div className="form-group">
            <label>Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name"  />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="Phone Number"  />
        </div>
        <div className="form-group">
            <label>Company</label>
            <input type="text" id="company" name="company" placeholder="Company"  />
        </div>
        <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default ContactForm;
