import React from 'react'
import './LoginForm.css'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { UserSignIn } from "../../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/userSlice";
import { useState} from 'react';

const LoginForm = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()

        await UserSignIn({ email, password })
            .then((res) => {
                console.log('API Response:', res);
                dispatch(loginSuccess(res.data));
                alert("Login Success");
            })
            .catch((err) => {
                console.error('API Error:', err.response);
                alert(err.response.data.message);
            });
    }

    return (
        <div className="wrapper">
            <form action="" >
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder='Enter your email' value={email} name="email" onChange={(e)=>setEmail(e.target.value)} required/>
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' value={password} name="password" onChange={(e)=>setPassword(e.target.value)} required/>
                    <FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="/forgot-password" target='_blank' rel="noopener noreferrer">Forgot password?</a>
                </div>

                <button type='submit' onClick={handleLogin}>Login</button>

            </form>

        </div>
    )
}

export default LoginForm;