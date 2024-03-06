import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const bodyObj = { username, password };
    try {
      const res = await axios.post("/api/login", bodyObj);
      
      if (res.data.sellerId === 1) {
        
        dispatch({ type: "USER_AUTH", payload: { sellerId: res.data.sellerId, username: username } });
        navigate("/admin");
      } else if (res.data.success) {
        dispatch({ type: "USER_AUTH", payload: { sellerId: res.data.sellerId, username: username } });
        navigate("/profile");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="buyer-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
