import './index.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"; 
import Home from "./pages/Home";
import Process from "./pages/Process"
import GoSolar from "./pages/GoSolar.jsx"
import About from "./pages/About.jsx"
import BuyLeads from "./pages/BuyLeads.jsx"
import Contact from "./pages/ContactUs.jsx"
import ContactForm from './components/ContactForm.jsx';
import axios from 'axios'


export default function App() {
 

  // const handleSubmit = async (event, formData) => {
  //   event.preventDefault();

  //   const res = await axios.post('/api/users', formData);

  //   if (res.data.success) {
  //     navigate('/me');
  //   }
  // };
  return (
    <BrowserRouter>
      <div className='App'>
      <header>
        <nav>
          <h1>Lead SRC</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="solar">Go Solar</NavLink>
          <NavLink to="process">Our Process</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="leads">Buy Leads</NavLink>
          <NavLink to="contact">Contact Us</NavLink>


        </nav>
      </header>
      
      <main>
        
        <Routes>
          <Route index element={<Home />} />
          <Route path="solar" element={<GoSolar />} />
          <Route path="process" element={<Process />} />
          <Route path="about" element={<About />} />
          <Route path="leads" element={<BuyLeads />} />
          <Route path="contact" element={<Contact />} />


        </Routes>
      
       <ContactForm />
      </main>
      
     
      </div>
    </BrowserRouter>
  );
}


