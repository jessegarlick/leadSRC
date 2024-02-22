import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 

function SolarButton() {
    const navigate = useNavigate()
    return (

        <button onClick={() => navigate(`/solar`)}>
            Get my estimate
        </button>
    )
}

export default SolarButton