import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaClipboardList } from "react-icons/fa"; // Import Icons
import { FaUserCircle } from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
    const [notifications, setNotifications] = useState([]);
    const [orders, setOrders] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [unreadOrders, setUnreadOrders] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Notifications
        fetch("http://localhost:5000/api/notifications")
            .then((res) => res.json())
            .then((data) => {
                setNotifications(data);
                setUnreadNotifications(data.filter((item) => !item.read).length);
            })
            .catch((error) => console.error("Error fetching notifications:", error));

        // Fetch Orders
        fetch("http://localhost:5000/api/orders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setUnreadOrders(data.filter((order) => !order.seen).length);
            })
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            {/* Top Section: Logo & Logout */}
            <div className="navbar-top">
                <Link to="/customer/home" className="navbar-logo">Tailoring Hub</Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Center: Navigation Links */}
            <div className="navbar-links">
                <Link to="/customer/home" className="navbar-link">Home</Link>
                <Link to="/customer/service" className="navbar-link">Services</Link>
            </div>

            {/* Right: Icons */}
            <div className="navbar-icons">
                {/* Order Details Icon */}
                <div className="icon-container">
                    <Link to="/customer/orders">
                        <FaClipboardList className="icon" />
                        {unreadOrders > 0 && <span className="badge">{unreadOrders}</span>}
                    </Link>
                </div>

                {/* Notification Bell Icon */}
                <div className="icon-container">
                    <Link to="/customer/notifications">
                        <FaBell className="icon" />
                        {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
                    </Link>
                </div>
                <div className="icon-container">
                    <Link to="/customer/profile">
                    <FaUserCircle className="icon" />
                    </Link>
</div>
            </div>
        </nav>
    );
};

export default Navbar;
