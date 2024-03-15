import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Process from "./pages/Process";
import Solar from "./pages/Solar.jsx";
import About from "./pages/About.jsx";
import BuyLeads from "./pages/BuyLeads.jsx";
import Contact from "./pages/ContactUs.jsx";
import ContactForm from "./pages/components/ContactForm.jsx";
import Blog from "./pages/Blog.jsx";
import LoginPage from "./pages/Login.jsx";
import BuySolarPreview from "./pages/BuySolarPreview.jsx";
import BuySolar from "./pages/BuySolar.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import LogoutButton from "./pages/Logout.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false); // State for managing the mobile nav toggle
  const sellerId = useSelector((state) => state.sellerId);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get("/api/session-check");
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: { sellerId: res.data.seller.sellerId, username: res.data.seller.username },
      });
    }
  };

  useEffect(() => {
    sessionCheck();
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen); // Toggle the visibility of the nav links
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <nav className="nav-bar">
            <div className="nav-logo">
              <NavLink to="/">
                <h3>LeadSRC</h3>
              </NavLink>
            </div>
            <div className={`nav-links ${isOpen ? "active" : ""}`}>
              <NavLink to="/solar">Go Solar</NavLink>
              <NavLink to="/process">Our Process</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/leads">Buy Leads</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
              {sellerId && (
                <>
                  <NavLink to="/profile">Profile</NavLink>
                  <LogoutButton />
                </>
              )}
              {!sellerId && <NavLink to="/login">Login</NavLink>}
            </div>
            <div className="nav-toggle" onClick={toggleNav}>
              Menu
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/solar" element={<Solar />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/leads" element={<BuyLeads />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post" element={<BuySolar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
