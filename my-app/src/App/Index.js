import React,{lazy, Suspense }from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "../Components/Header";

import Footer from "../Components/Footer";

const Home = lazy(() => import("../Components/Home"));
const About = lazy(() => import("../Components/About"));
const Contact = lazy(() => import("../Components/ContactUs"));
const ServicePage = lazy(() => import("../Components/Services"));
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
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicePage />} />
        </Routes>
      </Suspense>
      {location.pathname !== "/" && <Footer />}
    </>
  );
};

export default CowApp;
