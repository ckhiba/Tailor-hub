import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClipboardList, FaBell, FaUserCircle } from "react-icons/fa";
import "./TailorNavbar.css";

const TailorNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="tailor-navbar">
            {/* Left Section - Logo */}
            <div className="navbar-top-left">
                <Link to="/tailor-home" className="logo">Tailoring Hub</Link>
            </div>

            {/* Right Section - Logout Button & Icons */}
            <div className="navbar-top-right">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <div className="navbar-icon">
                    <Link to="/orders" className="nav-icon"><FaClipboardList /></Link>
                    <Link to="/notifications" className="nav-icon"><FaBell /></Link>
                    <Link to="/profile" className="nav-icon"><FaUserCircle /></Link>
                </div>
            </div>
        </nav>
    );
};

export default TailorNavbar;
