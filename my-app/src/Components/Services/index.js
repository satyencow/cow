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
            <h2>ADVERTISING</h2>
            <p>Strategy</p>
            <p>Brand positioning</p>
            <p>Communication</p>
          </div>
          <div className="service-column">
            <h2>DESIGN</h2>
            <p>Logo design</p>
            <p>Packaging design</p>
            <p>Brand identity</p>
          </div>
          <div className="service-column">
            <h2>DIGITAL</h2>
            <p>Digital marketing strategy</p>
            <p>Social media marketing</p>
          </div>
          <div className="service-column">
            <h2>RETAIL</h2>
            <p>Experiential design</p>
            <p>Retail design</p>
          </div>
          <div className="service-column">
            <h2>PRODUCTION</h2>
            <p>Digital film</p>
            <p>Television film</p>
            <p>Corporate film</p>
          </div>
          <div className="service-column">
            <h2>PROACTIFY</h2>
            <p>Driven by foresight and ideas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;