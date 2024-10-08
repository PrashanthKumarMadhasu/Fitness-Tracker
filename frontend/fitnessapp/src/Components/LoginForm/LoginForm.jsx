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
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        setButtonDisabled(true);

        await UserSignIn({ email, password })
            .then((res) => {
                console.log('API Response:', res);
                dispatch(loginSuccess(res.data));
                alert("Login Success");
                setLoading(false);
                setButtonDisabled(false);
                console.log(res)
            })
            .catch((err) => {
                console.error('API Error:', err.response);
                alert(err.response.data.message);
                setLoading(false);
                setButtonDisabled(false);
            });
    }

    return (
        <div className="wrapper">
            <form action="" >
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder='Enter your email' value={email} name="email" onChange={(e)=>setEmail(e.target.value)} />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' value={password} name="password" onChange={(e)=>setPassword(e.target.value)} />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>

                <button type='submit' onClick={(e)=>handleLogin(e)}>Login</button>

            </form>

        </div>
    )
}

export default LoginForm;