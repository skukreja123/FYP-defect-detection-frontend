// ContactUs.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs =  () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      console.log('Form data:', form); // Log the form data to check its structure
      const response = await axios.post(' https://enables-possibility-wn-downloaded.trycloudflare.com/contact/contact', form
, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the headers
        }
      }
      );
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="subtitle">We’d love to hear from you! Send us a message below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Message</button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
