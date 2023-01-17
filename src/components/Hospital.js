import React from 'react';
import emergencyLogo from "../images/emergency-612x612.jpg";
export default function Hospital() {

    return (<div className="title">
        <div>
        <img src={emergencyLogo} alt="logo" />
        </div>
        <div className="right">
        <h1>Karolinska Hospital</h1>
        <h5>Administration Portal</h5>
        </div>
        </div>
    )

}