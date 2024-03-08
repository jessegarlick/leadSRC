import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Process from "./pages/Process";
import Solar from "./pages/Solar.jsx";
import About from "./pages/About.jsx";
import BuyLeads from "./pages/BuyLeads.jsx";
import Contact from "./pages/ContactUs.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Blog from "./pages/Blog.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/Login.jsx"; 
import BuySolarPreview from "./pages/BuySolarPreview.jsx";
import BuySolar from "./pages/BuySolar.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import LogoutButton from "./pages/Logout.jsx"


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sellerId = useSelector((state) => state.sellerId);

  

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    // need to create req.body objects:
    const bodyObj = {
      username: username,
      password: password,
    };

    // now send this data to our login endpoint
    const res = await axios.post("/api/login", bodyObj);

    if (res.data.success) {
      // what do I do with the userId that returned to me?
      // dispatch the userId to the store
      dispatch({
        type: "USER_AUTH",
        payload: res.data.sellerId,
      });

      setUsername("");
      setPassword("");
    }
    alert(res.data.message);
  };

  // const handleLogout = async () => {
  //   const res = await axios.get("/api/logout");

  //   if (res.data.success) {
  //     // setUserId(null)
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   }
  
  // };

  const sessionCheck = async () => {
    const res = await axios.get("/api/session-check");
    if (res.data.success) {
      // setUserId(res.data.userId)
      dispatch({
        type: "USER_AUTH",
        payload: { sellerId: res.data.seller.sellerId, username: res.data.seller.username },
      });
    }
  };

  useEffect(() => {
    sessionCheck();
  }, []);

  // const LogoutButton = () => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const handleLogout = async () => {
  //     const res = await axios.get("/api/logout");
  //     if (res.data.success) {
  //       dispatch({ type: "LOGOUT" });
  //       navigate('/');
  //     }
  //   };
  
  //   return (
  //     <button onClick={handleLogout}>Logout</button>
  //   );
  // };

return (
  <BrowserRouter>
    <div className="App">
     
      <header className="app-header">
        <nav className="nav-bar">
          <div>
            <NavLink to="/">
              <h3>LeadSRC</h3>
            </NavLink>
          </div>
          <div>
            <NavLink to="/solar">Go Solar</NavLink>
            <NavLink to="/process">Our Process</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/leads">Buy Leads</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            {sellerId ? (
              <>
              <NavLink to="/profile">Profile</NavLink>
              <LogoutButton />
              </>
            ) : <Link to="/login">Login</Link>}
          </div>
        </nav>
      </header>
      <main className="app-main">
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
