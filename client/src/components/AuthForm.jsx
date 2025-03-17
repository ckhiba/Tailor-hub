import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("customer");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("red");
    const [phoneError, setPhoneError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
        }

        try {
            if (isLogin) {
                const res = await axios.post("http://localhost:5000/api/auth/login", { phone, password });

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user details

                if (res.data.user.role === "tailor") {
                    console.log(" Storing Tailor ID:", res.data.user._id); // Debugging log
                    localStorage.setItem("tailorId", res.data.user._id); // Fix here!
                } else {
                    localStorage.removeItem("tailorId");
                }
                


                setMessage("Login successful!");
                setMessageColor("green");

                // Redirect Based on Role
                setTimeout(() => {
                    navigate(res.data.user.role === "tailor" ? "/tailor/home" : "/customer/home");
                }, 1000);
            } else {
                // SIGNUP Request
                const res = await axios.post("http://localhost:5000/api/auth/register", {
                    name, phone, email, password, role
                });

                setMessage(res.data.message || "Signup successful! Redirecting to login...");
                setMessageColor("green");

                // Reset fields and switch to login mode
                setTimeout(() => {
                    setIsLogin(true);
                    setMessage("");
                    setName("");
                    setPhone("");
                    setEmail("");
                    setPassword("");
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
            setMessageColor("red");
        }
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;

        if (!/^\d*$/.test(input)) return;

        setPhone(input);
        setPhoneError(input.length !== 10 ? "Phone number must be exactly 10 digits" : "");
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage("");
        setPhoneError("");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                
                {message && <p style={{ color: messageColor }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </>
                    )}
                    
                    <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        required 
                        autoComplete="off" 
                        name="phone"
                        defaultValue="" 
                        key="phone-input"
                    />
                    {phoneError && <p style={{ color: "red" }}>* {phoneError}</p>}

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        autoComplete="new-password" 
                        name="password"
                        defaultValue="" 
                        key="password-input"
                        />
                    {!isLogin && (
                        <div className="role-selection">
                            <label>Role:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="customer">Customer</option>
                                <option value="tailor">Tailor</option>
                            </select>
                        </div>
                    )}

                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>

                <p onClick={toggleForm} className="toggle-link">
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
