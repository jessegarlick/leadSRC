import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./LogoutButton.css"; // Import the CSS file for styling

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await axios.get("/api/logout");
    if (res.data.success) {
      dispatch({ type: "LOGOUT" });
      navigate('/');
    }
  };

  return (
    <button className="nav-link" onClick={handleLogout}>Logout</button> // Apply the nav-link class
  );
};

export default LogoutButton;
