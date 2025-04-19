import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import About from "../Components/About";
import Contact from "../Components/ContactUs";
import Home from "../Components/Home";
import ServicePage from "../Components/Services";
import Footer from "../Components/Footer";

const CowApp = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicePage />} />
      </Routes>
      {location.pathname !== "/" && <Footer />} {/* Footer will not show on Home page */}
    </>
  );
};

export default CowApp;
