import React from 'react';
import './ServicesPage.css';  // Import the CSS file for styling
import Navbar from '../components/Navbar';
import Service from '../components/Service';
import Footer from '../components/Footer';

const ServicesPage = () => {
    return (
        <>
        <Navbar/>
        <Service/>
        <Footer/>
        </>
    );
};

export default ServicesPage;
