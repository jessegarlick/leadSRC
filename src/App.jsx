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

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userId = useSelector((state) => state.userId);

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
        payload: res.data.userId,
      });

      setUsername("");
      setPassword("");
    }
    alert(res.data.message);
  };
  const handleLogout = async () => {
    const res = await axios.get("/api/logout");

    if (res.data.success) {
      // setUserId(null)
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const sessionCheck = async () => {
    const res = await axios.get("/api/session-check");
    if (res.data.success) {
      // setUserId(res.data.userId)
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId,
      });
    }
  };
  useEffect(() => {
    sessionCheck();
  }, []);

  // Import statements remain unchanged
// Add this import for your new LoginPage

// Inside App function, before the return statement:
// No changes needed to your existing hooks and functions

return (
  <BrowserRouter>
    <div className="App">
      <header>
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <NavLink to="/">
              <h1>Lead SRC</h1>
            </NavLink>
          </div>
          <div>
            <NavLink to="solar">Go Solar</NavLink>
            <NavLink to="process">Our Process</NavLink>
            <NavLink to="about">About</NavLink>
            <NavLink to="leads">Buy Leads</NavLink>
            <NavLink to="blog">Blog</NavLink>
            <NavLink to="contact">Contact Us</NavLink>
            {userId ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link> // Changed this line
            )}
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="solar" element={<Solar />} />
          <Route path="process" element={<Process />} />
          <Route path="about" element={<About />} />
          <Route path="leads" element={<BuyLeads />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginPage />} /> // Add this line
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

// Export statement remains unchanged

}

export default App;
