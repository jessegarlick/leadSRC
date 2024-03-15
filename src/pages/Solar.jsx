import React from "react";
import BuyerForm from "./components/BuyerForm.jsx";
import "./css/solar.css";

function Solar() {
  return (
    <div className="solar-container">
      <div className="solar-header">
        <h2>
          Come be a part of shaping a greener, sustainable future energized by
          solar power!
        </h2>
      </div>

      <div className="solar-content mb-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">FILL OUT THE SURVEY</h3>
            <p className="card-text">
              Within minutes, we'll connect your request with select, reliable
              installers in your vicinity, ensuring your personal contact
              information is kept secure and private.
            </p>
          </div>
        </div>
      </div>

      <div className="solar-content mb-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">REVIEW YOUR QUOTES</h3>
            <p className="card-text">
              Your local area installers will craft personalized pricing plans
              and deliver them straight to you.
            </p>
          </div>
        </div>
      </div>

      <div className="solar-content mb-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">COMPARE AND SAVE</h3>
            <p className="card-text">
              You have the power. Select the proposal that best matches your
              needs.
            </p>
          </div>
        </div>
      </div>

      <div className="solar-content">
        <div className="solar-form-container">
          <BuyerForm />
        </div>
      </div>
    </div>
  );
}

export default Solar;
