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
                const res = await axios.post("http://localhost:5000/api/auth/login", {
                    phone,
                    password,
                });
    
                const { token, user, tailorId } = res.data;
    
                                // After successful login
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                if (res.data.user.role === "tailor" && res.data.tailorId) {
                    localStorage.setItem("tailorId", res.data.tailorId); //  Store tailorId
                } else {
                    localStorage.removeItem("tailorId");
                }

                setMessage("Login successful!");
                setMessageColor("green");
    
                //  Redirect Based on Role
                setTimeout(() => {
                    navigate(user.role === "tailor" ? "/tailor/home" : "/customer/home");
                }, 1000);
            } else {
                //  SIGNUP Request
                const res = await axios.post("http://localhost:5000/api/auth/register", {
                    name,
                    phone,
                    email,
                    password,
                    role,
                });
    
                setMessage(res.data.message || "Signup successful! Redirecting to login...");
                setMessageColor("green");
    
                //  Reset fields after successful registration
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

    //  Handle Phone Input with Validation
    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (!/^\d*$/.test(input)) return;
        setPhone(input);
        setPhoneError(input.length !== 10 ? "Phone number must be exactly 10 digits" : "");
    };

    //  Reset Form Fields
    const resetForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setPhoneError("");
        setMessage("");
    };

    //  Toggle Between Login and Sign Up
    const toggleForm = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>

                {message && <p style={{ color: messageColor }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Name & Email Fields for Signup */}
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </>
                    )}

                    {/* Phone Input */}
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                        autoComplete="off"
                        name="phone"
                    />
                    {phoneError && <p style={{ color: "red" }}>* {phoneError}</p>}

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        name="password"
                    />

                    {/* Role Selection for Signup */}
                    {!isLogin && (
                        <div className="role-selection">
                            <label>Role:</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="customer">Customer</option>
                                <option value="tailor">Tailor</option>
                            </select>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>

                {/* Toggle Between Login and Signup */}
                <p onClick={toggleForm} className="toggle-link">
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
