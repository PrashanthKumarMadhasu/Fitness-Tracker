import React from 'react'
import './Contact.css'
import { sendFeedback } from '../../api';
import { useState } from 'react';


const Contact = () => {

  const [contactFormData, setContactFormData] = useState({});

  const handleFeedback = async (contactFormData) => {
    const token = localStorage.getItem("fittrack-app-token");
    console.log(`contact form data ${JSON.stringify(contactFormData)}`);
    try {
      const res = await sendFeedback(token, contactFormData);
    } catch (error) {
      alert("Failed to send Feedback. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("the formData or updated profile Data", contactFormData)
    handleFeedback(contactFormData);
    setContactFormData({});
  };

  return (
    <div className='contact'>
      <div className='contact-wrapper'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 id='contact-header'>Contact</h1>
          <div className='form-inputs'>
            <input type="text"
              name='firstName'
              placeholder="First Name"
              value={contactFormData.firstName || ''}
              onChange={handleChange}
              required />

            <input type="text"
              name='lastName'
              placeholder='Last Name'
              value={contactFormData.lastName || ''}
              onChange={handleChange}
              required />

          </div>

          <div className='form-inputs'>
            <input type="email"
              name='email'
              placeholder='Email'
              value={contactFormData.email || ''}
              onChange={handleChange}
              required />

            <input type="text"
              name='mobile'
              placeholder='Mobile'
              value={contactFormData.mobile || ''}
              onChange={handleChange}
              required />
          </div>

          <h4>Type your Message</h4>
          <textarea
            name='message'
            value={contactFormData.message || ''}
            onChange={handleChange}
            required></textarea>
          <button type='submit' id='button'>Send</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Contact