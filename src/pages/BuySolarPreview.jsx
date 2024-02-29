import React from "react";
import { useNavigate } from "react-router-dom";

function BuySolarPreview() {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Buying solar panels in 2024: The complete guide</h1>
      <h5>
        Rooftop solar panels have transitioned from being considered luxury
        items to practical investments for many homeowners. Opting for solar
        energy can lead to substantial savings on electricity bills, reduce
        environmental impact, and even fully power your home using renewable
        energy. Installing solar panels can enhance your property's value while
        drastically cutting your electricity expenses. However, it's a
        significant investment, so it's crucial to evaluate its benefits for
        your specific situation before proceeding.
      </h5>
      <p className="hyper-link" onClick={() => navigate(`/post`)}>
          Learn more
        </p>
    </div>
  );
}

export default BuySolarPreview;
