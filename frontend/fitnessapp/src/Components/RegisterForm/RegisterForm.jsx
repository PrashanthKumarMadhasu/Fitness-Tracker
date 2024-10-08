import React, { useState } from 'react'
import '../LoginForm/LoginForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { loginSuccess } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { UserSignUp } from "../../api";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        await UserSignUp({ fullname, email, password })
            .then((res) => {
                dispatch(loginSuccess(res.data));
                alert("Account Created Success");
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    }

    return (
        <div className="wrapper">
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' value={fullname} onChange={(e)=>{setFullname(e.target.value)}} required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="email" placeholder='example@gamil.com' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
                    <FaLock className='icon' />
                </div>

                <button type='submit' onClick={handleRegister}>Register</button>

            </form>

        </div>
    )
}

export default RegisterForm;