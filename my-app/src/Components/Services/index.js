import React from "react";
import "./styles.css";
import Services from "../../Images/Services.jpeg";

const ServicePage = () => {
  
  return (
    <div className="service-container">
       <picture>
          <img src={Services} alt="Section 1 Background" className="background-image" />
        </picture>
      <div className="service-overlay">
        <div className="service-content">
          <div className="service-column">
            <h2>ADVERTISING:</h2>
            <p>Strategy</p>
            <p>Brand positioning</p>
            <p>Mainline communication</p>
            <p>Media planning</p>

          </div>
          <div className="service-column">
            <h2>DESIGN:</h2>
            <p>Logo and packaging design</p>
            <p>Brand identity</p>
          </div>
          <div className="service-column">
            <h2>DIGITAL:</h2>
            <p>Digital marketing</p>
            <p>Social media marketing</p>
            <p>Content creation</p>
            <p>Influencer marketing</p>


          </div>
          <div className="service-column">
            <h2>Experiential design:</h2>
            <p>Activation</p>
            <p>Retail space</p>
          </div>
          <div className="service-column">
            <h2>PRODUCTION</h2>
            <p>Digital film</p>
            <p>Television film</p>
            <p>Corporate film</p>
          </div>
          <div className="service-column">
            <h2>PROACTIFY</h2>
            <p>Fueled by foresight. Ideas,<br/>before the client asks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;