    import React from "react";
    import Navbar from "../components/Navbar";
    import "./CustomerHome.css";
    import ServicesPage from "./ServicesPage";
    import AboutUsPage from "./AboutUsPage";

    function CustomerHome() {
    return (
        <>
        <Navbar />
        <div className="hero">
            <div className="hero-overlay" />
            <div className="container-home">
            <h1>Find Your Perfect Tailor,</h1>
            <p>Custom fits & expert tailoring for all your needs.</p>
            <a href="/customer/service" className="btn">
                Get Started
            </a>
            </div>
            <div className="hero-image">
            <img src="/images/image_home.jpg" alt="Tailor at work" />
            </div>
        </div>
        </>
    );
    }

    export default CustomerHome;
