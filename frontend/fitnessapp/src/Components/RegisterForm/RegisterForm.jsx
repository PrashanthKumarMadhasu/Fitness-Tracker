import React from 'react'
import './RegisterForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link} from "react-router-dom"


export const RegisterForm = () => {
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

            <div className="register-link">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </form>
        
    </div>
  )
}