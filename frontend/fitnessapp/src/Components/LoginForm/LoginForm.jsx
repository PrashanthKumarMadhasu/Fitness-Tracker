import React from 'react'
import './LoginForm.css'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link} from "react-router-dom"


export const LoginForm = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="email" placeholder='Enter your email' required/>
                <MdEmail className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required/>
                <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#">Forgot password?</a>
            </div>

            <button type='submit'>Login</button>

            <div className="register-link">
                <p>Don't have an account? <Link to="/">Register</Link></p>
            </div>
        </form>

    </div>
  )
}