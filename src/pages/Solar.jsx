import React from 'react';
import BuyerForm from "../components/BuyerForm.jsx";
import "../index.css";

function Solar() {
    return (
        <div className="container-fluid">
            <div className="solar-info-section text-center mb-4">
                <h2>Join us in pioneering a cleaner, more sustainable future powered by the sun!</h2>
            </div>

            <div className="solar-info-section mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Fill out our survey</h3>
                        <p className="card-text">In minutes, your query will be sent to pre-screened and trustworthy installers in your area. Your contact information will stay private.</p>
                    </div>
                </div>
            </div>

            <div className="solar-info-section mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Review your quotes</h3>
                        <p className="card-text">Installers in your area will build out customized pricing options sent right to you.</p>
                    </div>
                </div>
            </div>

            <div className="solar-info-section mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Compare & save</h3>
                        <p className="card-text">You're in control. Choose the quote that's the right fit for you.</p>
                    </div>
                </div>
            </div>

            <div className="solar-form-section">
                <div className="solar-form-container">
                    <BuyerForm />
                </div>
            </div>
        </div>
    );
}

export default Solar;
