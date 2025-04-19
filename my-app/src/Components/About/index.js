import React, { useState, useEffect } from "react";
import "./styles.css";
import desktopAbout1 from "../../Images/Aboutus1.jpeg"; // Desktop version
import desktopAbout2 from "../../Images/Aboutus2.jpeg";
import desktopAbout3 from "../../Images/Aboutus.jpeg";
import brandImage from "../../Images/brands/COW Design-05.jpg";
import { Dialog, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function About() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMediaDialogOpen, setMediaDialog] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  useEffect(() => {
  
    const elements = document.querySelectorAll(".animate-on-scroll");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
        
    
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } 
       
        });
      },
      { threshold: 0.1 } // Lower threshold to trigger animation earlier
    );
  
    elements.forEach((el) => observer.observe(el));
  
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const openMediaDialog = () => {
    setMediaDialog(true)
  }
 const closeMediaDialog = () => {
   setMediaDialog(false)
 }
  return (
    <div className="about-container">
      {/* Section 1 */}
      <section className="about-section">
        <picture>
          <img src={desktopAbout1} alt="Section 1 Background" className="background-image" />
        </picture>
        <div className="overlay animate-on-scroll">
          <p>
            We are not an AD agency, <br />but an ADD agency that adds long-term value 
            <br />to elevate your brand to greater heights.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section">
        <picture>
          <img src={desktopAbout2} alt="Section 2 Background" className="background-image" />
        </picture>
        <div className="overlay animate-on-scroll">
          <p>
            Boosting your business is our business.<br /> Because nothing the cow produces ever go to waste.
            <br />Even the waste is precious manure.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section about-section-custom">
        <picture>
          <img src={desktopAbout3} alt="Section 3 Background" className="background-image" />
        </picture>
        <div className="custom-overlay animate-on-scroll">
          <h1>SATYEN PARAB</h1>
          <h2>Founder and Chief Creative Cow</h2>
          <p>
            Assistant Director (Movies)<br />
            Playwright, Art Director, Director, Actor (Theater)
          </p>
          <h3>Previous Agencies:</h3>
          <p>
            Bates Enterprise,<br /> Publicis India,<br /> Everest Brand Solutions,<br />
            Scarecrow Communications, <br />Salt Brand Solutions
          </p>
          <h3>Awards & Achievements:</h3>
          <p>
          Satyen has received numerous prestigious national awards and international<br/>
          recognitions, including Gold, Silver, and Bronze at the Big Bang Awards<br/>
          (Bangalore Ad Club), MADDYs Awards (Madras Ad Club), and Goafest Abbys.<br/> 
          His work has been showcased as the best in the Asia region within the<br/>
          Bates Asia Network, and the Fink Tank logo design was shortlisted in a<br/>
          global contest. Additionally, he has earned accolades such as Best Writer,<br/>
          Best Art Director, and Best Actor at State-Level Theater Awards, along with<br/> 
          prestigious State Art Awards from the Maharashtra Government.

          </p>
          <p>
            <a href="https://www.behance.net/SatyenParab" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>
              Founder's previous agencies work
            </a>
            <br />
            <span style={{ color: "white", textDecoration: "underline", cursor: "pointer" }} onClick={openDialog}>
              Brands
            </span>
            <br />
            <span style={{ color: "white", textDecoration: "underline", cursor: "pointer" }} onClick={openMediaDialog}>
              Media
            </span>
          </p>
        </div>
      </section>

      {/* Dialog Box for Brands */}
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="lg" classes={{ paper: "dialog" }} icon={true}>
      <img src={brandImage} alt="Brand" className="brand-image" />
      
        </Dialog>
      
    {/* Dialog Box for Media */}
    <Dialog open={isMediaDialogOpen} onClose={closeMediaDialog} fullWidth maxWidth="lg" classes={{ paper: "media-dialog" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Silicon India</AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.siliconindia.com/profiles/satyen-parab-m1bA39L5.html"
              title="Silicon India"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            ></iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Adgully</AccordionSummary>
          <AccordionDetails>
            <iframe
              src="https://www.adgully.com/agvoice-celebrating-100-years-54339.html"
              title="Adgully"
              width="100%"
              height="500px"
              style={{ border: "none" }}
            ></iframe>
          </AccordionDetails>
        </Accordion>
      </Dialog>
    </div>
  );
}

export default About;