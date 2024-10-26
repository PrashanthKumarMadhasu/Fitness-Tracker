import React, { useState } from 'react';
import './ForgotForm.css';
import { FaEnvelope } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, updatePassword} from "../../api";


const status = styled.p`
    margin-top:1rem;
    color: ${({props}) => (props.color)};
`;

const ForgotForm = () => {
    const navigate = useNavigate();
    const [color,setColor] = useState('green')
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();

        await sendOtp({ email })
            .then((res) => {
                setColor('green')
                setMessage("Check your email for the OTP");
                setOtpSent(true);
            })
            .catch((err) => {
                setColor('red')
                setMessage(err.response?.data?.message || "Failed to send OTP.");
                setResendOtp(true);
            });
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        await verifyOtp({email, enteredOtp })
            .then((res) => {
                setColor('green')
                setMessage("OTP verified");//popup should be added
                setVerified(true);
            })
            .catch((err) => {
                setColor('red')
                setMessage(err.response?.data?.message || "Invalid OTP! Please try again.");
                setEnteredOtp("");
                setVerified(false);
                setEnteredOtp("");
                setResendOtp(false);
            });
    };

    const handleGoBack = () => {
        setOtpSent(false);
        setMessage("");
    }

    const handleReset = async(e) => {
        e.preventDefault();

        // Password pattern validation (example: at least 8 chars, 1 number, 1 special char)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            setColor('red')
            setMessage("Password must be at least 8 characters long and contain a number and a special character.");
            return;
        }

        if (password !== confirmPassword) {
            setColor('red')
            setMessage("Passwords do not match.");
            return;
        }

        await updatePassword({email, password, confirmPassword})
            .then((res) => {
                setOtpSent(true);   
            })
            .catch((err) => {
                setColor('red')
                setMessage(err.response?.data?.message || "Error");
                setResendOtp(true);
            });
        setColor('green')
        setMessage("Password updated successfully.");//popup should be added

        //Redirect to login page after a few seconds
        setTimeout(() => {
            navigate("http://localhost:5173/");
        }, 2000);
    }

    return (
        <div className="forgot-password-wrapper">
            <div>
                <form className='forgot-form'>
                    {!otpSent ? (
                        <>
                            <h1 className='forgot-header'>Forgot Password ? </h1>
                            <p>Enter your email address to reset your password</p>

                            <div className="input-email">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <FaEnvelope className='icon' />
                            </div>

                            <button type="button" className="otp" onClick={handleSendOtp}>{!resendOtp ? "SEND OTP" : "RESEND OTP"} </button>
                            <br />
                            {message && <status color={color}>{message}</status>}
                        </>
                    ) : (
                        (!verified ? (
                            <>
                                <>
                                    <h1 className='forgot-header'>Enter OTP</h1>
                                    {message && <status color={color}>{message}</status>}
                                    <div className="input-otp">
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={enteredOtp}
                                            onChange={(e) => setEnteredOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="button" className="otp" onClick={handleVerifyOTP}>VERIFY OTP</button>
                                    <p><a style={{ cursor: 'pointer', }} onClick={handleGoBack}>Go back</a></p>
                                </>
                            </>
                        ) : (
                            <>
                                <h1 className='forgot-header'>Reset Password</h1>

                                <div className="input-password">
                                    <input
                                        type="text"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="input-password">
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className='update-otp' onClick={handleReset}>Update Password</button>
                                {message && <status color={color}>{message}</status>}
                            </>))
                    )}
                </form>
            </div>
        </div>
    );
}

export default ForgotForm;
