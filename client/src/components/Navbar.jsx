    import React from "react";
    import { Link } from "react-router-dom";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.bundle.min.js";
    import "../components/Navbar.css"; // For additional styling

    const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            {/* Brand (Logo) */}
            <Link className="navbar-brand fw-bold" to="/">
            Tailoring Hub
            </Link>

            {/* Toggle Button */}
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Items */}
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link" to="/customer/home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/customer/service">Services</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/customer/about">About Us</Link>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="categoryDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                    {/* Alteration Dropdown */}
                    <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Alteration</a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/alteration/men">Men</Link></li>
                        <li><Link className="dropdown-item" to="/alteration/women">Women</Link></li>
                        <li><Link className="dropdown-item" to="/alteration/boys">Boys</Link></li>
                        <li><Link className="dropdown-item" to="/alteration/girls">Girls</Link></li>
                    </ul>
                    </li>

                    {/* Stitching Dropdown */}
                    <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Stitching</a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/stitching/men">Men</Link></li>
                        <li><Link className="dropdown-item" to="/stitching/women">Women</Link></li>
                        <li><Link className="dropdown-item" to="/stitching/boys">Boys</Link></li>
                        <li><Link className="dropdown-item" to="/stitching/girls">Girls</Link></li>
                    </ul>
                    </li>

                    {/* Customization Dropdown */}
                    <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">Customization</a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/customization/men">Men</Link></li>
                        <li><Link className="dropdown-item" to="/customization/women">Women</Link></li>
                        <li><Link className="dropdown-item" to="/customization/boys">Boys</Link></li>
                        <li><Link className="dropdown-item" to="/customization/girls">Girls</Link></li>
                    </ul>
                    </li>
                </ul>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/Order">Order details</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Notification">Notification</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
    };

    export default Navbar;
