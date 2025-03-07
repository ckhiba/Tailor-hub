import React from "react";
import Navbar from "../components/Navbar";
import "./CustomerHome.css";
import ServicesPage from "./ServicesPage";
import AboutUsPage from "./AboutUsPage";
import Service from "../components/Service";
import CusAboutUsPage from "../components/CusAboutUsPage";
import Footer from "../components/Footer";

function CustomerHome() {
return (
    <>
    <Navbar />
    <div className="home-container">
<div className="overlay"></div>
<div className="content">
  <h1>Welcome to Tailoring Hub</h1>
  <p>Experience the best custom tailoring services with us.</p>
  <button className="explore-btn">Explore Now</button>
</div>
</div>

    <Service />
    <CusAboutUsPage />
    <Footer/>
    </>
);
}

export default CustomerHome;
