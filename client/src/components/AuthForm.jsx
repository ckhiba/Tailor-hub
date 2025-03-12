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
    const [messageColor, setMessageColor] = useState("red"); // Message color (red for errors, green for success)
    const [phoneError, setPhoneError] = useState(""); // Phone number error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if phone number is invalid
        if (phone.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
        }

        try {
            if (isLogin) {
                // LOGIN Request
                const res = await axios.post("http://localhost:5000/api/auth/login", { phone, password });
                localStorage.setItem("token", res.data.token);
                
                setMessage("Login successful!");
                setMessageColor("green");

                // Redirect Based on Role
                setTimeout(() => {
                    if (res.data.role === "customer") {
                        navigate("/customer/home");
                    } else {
                        navigate("/tailor/home");
                    }
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
                    setMessage(""); // Clear message
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

        // Allow only numeric input
        if (!/^\d*$/.test(input)) return;

        setPhone(input);

        if (input.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
        } else {
            setPhoneError("");
        }
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
                    />
                    {phoneError && <p style={{ color: "red" }}>* {phoneError}</p>}

                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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
