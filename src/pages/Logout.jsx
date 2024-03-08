import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

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
      <button onClick={handleLogout}>Logout</button>
    );
  };

export default LogoutButton