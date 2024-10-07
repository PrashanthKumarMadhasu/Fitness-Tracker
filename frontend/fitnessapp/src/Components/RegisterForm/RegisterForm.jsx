import React from 'react'
import '../LoginForm/LoginForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const RegisterForm = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Register</h1>
            <div className="input-box">
                <input type="text" placeholder='Username' required/>
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type="email" placeholder='example@gamil.com' required/>
                <MdEmail className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required/>
                <FaLock className='icon'/>
            </div>

            <button type='submit'>Register</button>

        </form>
        
    </div>
  )
}

export default RegisterForm;