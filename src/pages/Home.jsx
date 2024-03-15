import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/home.css"; 
import sunGreenMountainsImage from "../images/sun_green_mountains_image.jpeg"; 


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>SOLAR CALCULATOR</h2>
        <p>
          Wondering what solar might cost you? We’ll estimate your upfront
          costs, savings, and financing options — no commitment required.
        </p>
        <button onClick={() => navigate("/solar")}>Learn more</button>
      </div>

      <div className="home-content">
        <h2>SOLAR FINANCING</h2>
        <p>
          Learn how you can pay over time and make your clean energy dreams a
          reality. Review your solar financing options today.
        </p>
        <button onClick={() => navigate("/blog")}>Learn more</button>
      </div>

      <div className="home-content">
        <h2>SOLAR TAX CREDITS</h2>
        <p>
          We'll help you navigate all of your savings opportunities with our
          state-specific guide.
        </p>
        <button onClick={() => navigate("/blog")}>Learn more</button>
      </div>
    </div>
  );
}

export default Home;
