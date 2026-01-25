import React, { useState, useRef } from 'react';
import './styles.css'; // Import your styles
import { Turnstile } from '@marsidev/react-turnstile'


const ContactUs = () => {
  const form = useRef()
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    turnstileToken:"",
    phone: "",
    topic: "Topic",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   if (!token) {
    alert("Please verify captcha");
    return;
  }
      
  
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        body: JSON.stringify({turnstileToken:token,formData}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Email sent successfully!');
        setFormData({
          user_name: "",
          user_email: "",
          phone: "",
          topic: "Topic",
          message: "",
          turnstileToken:""
          
        });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Error sending email. Please try again later.');
    
  }
  };

  return (
    <div className="contact-container">
      <h1>Contact Cow</h1>
      <form ref={form} onSubmit={handleSubmit} className='contact-form'>
        <div className="form-group">
          <input type="text" name="user_name" placeholder="Name" value={formData.user_name} onChange={handleChange} required />
          <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <select name="topic" value={formData.topic} onChange={handleChange} required>
            <option value="Topic">Topic</option>
            <option value="New Projects">New Projects</option>
            <option value="General queries">General Queries</option>
            <option value="Say hello">Say Hello</option>
          </select>
        </div>
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
              <Turnstile siteKey={process?.env?.REACT_APP_TURNSTILE_SITE_KEY}   onSuccess={(token) => setToken(token)}
/><input type="text" name="hp_field" style={{ display: "none" }} onChange={handleChange} />


        <button type="submit">Send</button>
      </form>
      <div className="contact-info">
        <h2>Call +91 9819134779</h2>
        <h2>satyen@cowtheagency.in</h2>
      </div>
    </div>
  );
};

export default ContactUs;
