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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // LOGIN Request
                const res = await axios.post("http://localhost:5000/api/auth/login", { phone, password });
                localStorage.setItem("token", res.data.token);
                
                // Redirect Based on Role
                if (res.data.role === "customer") {
                    navigate("/customer/home");
                } else {
                    navigate("/tailor/home");
                }
            } else {
                // SIGNUP Request
                const res = await axios.post("http://localhost:5000/api/auth/register", {
                    name, phone, email, password, role
                });
                setMessage(res.data.message);
                setIsLogin(true); // Switch to login after signup
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {message && <p style={{ color: "red" }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </>
                    )}
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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

                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
