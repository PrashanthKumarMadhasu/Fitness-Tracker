import React from 'react'
import './Contact.css'
const Contact = () => {
  return (
    <div className='contact'>
      <div className='form-container'>
        <form action="">
          <h1 id='contact-header'>Contact</h1>
          <div className='form-inputs'>
            <input type="text" id='firstName' placeholder="First Name" required />
            <input type="text" id='lastName' placeholder='Last Name' required />
          </div>
          <div className='form-inputs'>
            <input type="email" id='email' placeholder='Email' required />
            <input type="text" id='mobile' placeholder='Mobile' required />
          </div>


          <h4>Type your Message</h4>
          <textarea name="" id='message' required></textarea>
          <button type='submit' id='button' >Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact