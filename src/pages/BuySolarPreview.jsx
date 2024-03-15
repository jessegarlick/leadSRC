import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function BuySolarPreview() {
  const navigate = useNavigate();
  return (
    <div className="process-container">
      <h1 className="process-title">
        Buying solar panels in 2024: The complete guide
      </h1>
      <h3 className="author">By Jesse Garlick  March 12, 2024</h3>
      <p className="process-description">
        Rooftop solar panels have transitioned from being considered luxury
        items to practical investments for many homeowners. Opting for solar
        energy can lead to substantial savings on electricity bills, reduce
        environmental impact, and even fully power your home using renewable
        energy. Installing solar panels can enhance your property's value while
        drastically cutting your electricity expenses. However, it's a
        significant investment, so it's crucial to evaluate its benefits for
        your specific situation before proceeding.
      </p>
      <p className="hyper-link" onClick={() => navigate(`/post`)}>
        Learn more
      </p>
    </div>
  );
}

export default BuySolarPreview;
