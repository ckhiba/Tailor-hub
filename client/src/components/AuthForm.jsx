// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AuthForm.css";

// const AuthForm = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [role, setRole] = useState("customer");
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (isLogin) {
//                 // LOGIN Request
//                 const res = await axios.post("http://localhost:5000/api/auth/login", { phone, password });
//                 localStorage.setItem("token", res.data.token);
                
//                 // Redirect Based on Role
//                 if (res.data.role === "customer") {
//                     navigate("/customer/home");
//                 } else {
//                     navigate("/tailor/home");
//                 }
//             } else {
//                 // SIGNUP Request
//                 const res = await axios.post("http://localhost:5000/api/auth/register", {
//                     name, phone, email, password, role
//                 });
//                 setMessage(res.data.message);
//                 setIsLogin(true); // Switch to login after signup
//             }
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Something went wrong");
//         }
//     };

//     return (
//         <div className="auth-container" style={{ backgroundColor: "#2e2b29", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <div className="auth-box" style={{ background: "#1e1c1a", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", textAlign: "center", width: "350px", color: "white" }}>
//                 <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>{isLogin ? "Login" : "Sign Up"}</h2>
//                 {message && <p style={{ color: "red" }}>{message}</p>}

//                 <form onSubmit={handleSubmit}>
//                     {!isLogin && (
//                         <>
//                             <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />
//                             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />
//                         </>
//                     )}
//                     <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />
//                     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />

//                     {!isLogin && (
//                         <div className="role-selection" style={{ marginBottom: "10px", textAlign: "left" }}>
//                             <label>Role:</label>
//                             <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ padding: "10px", borderRadius: "6px", width: "100%", border: "none", background: "#3a3735", color: "white" }}>
//                                 <option value="customer">Customer</option>
//                                 <option value="tailor">Tailor</option>
//                             </select>
//                         </div>
//                     )}

//                     <button type="submit" style={{ width: "100%", padding: "12px", background: "#6d6a68", color: "white", fontSize: "18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}> 
//                         {isLogin ? "Login" : "Sign Up"} 
//                     </button>
//                 </form>

//                 <p onClick={() => setIsLogin(!isLogin)} style={{ marginTop: "15px", fontSize: "14px", cursor: "pointer", textDecoration: "underline" }}>
//                     {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AuthForm;
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

                setMessage(res.data.message || "Signup successful! Please log in.");
                setMessageColor("green");

                setIsLogin(true); // Switch to login after signup
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

    return (
        <div className="auth-container" style={{ backgroundColor: "#2e2b29", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="auth-box" style={{ background: "#1e1c1a", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", textAlign: "center", width: "350px", color: "white" }}>
                <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>{isLogin ? "Login" : "Sign Up"}</h2>
                
                {message && <p style={{ color: messageColor }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />
                        </>
                    )}
                    
                    <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        required 
                        style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} 
                    />
                    {phoneError && <p style={{ color: "red", marginBottom: "10px", fontWeight: "thin" }}>* {phoneError}</p>}


                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "none", background: "#3a3735", color: "white" }} />

                    {!isLogin && (
                        <div className="role-selection" style={{ marginBottom: "10px", textAlign: "left" }}>
                            <label>Role:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ padding: "10px", borderRadius: "6px", width: "100%", border: "none", background: "#3a3735", color: "white" }}>
                                <option value="customer">Customer</option>
                                <option value="tailor">Tailor</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" style={{ width: "100%", padding: "12px", background: "#6d6a68", color: "white", fontSize: "18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}> 
                        {isLogin ? "Login" : "Sign Up"} 
                    </button>
                </form>

                <p onClick={() => setIsLogin(!isLogin)} style={{ marginTop: "15px", fontSize: "14px", cursor: "pointer", textDecoration: "underline" }}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default AuthForm; 
