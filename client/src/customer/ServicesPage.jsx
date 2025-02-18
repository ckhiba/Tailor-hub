import React from 'react';
import './ServicesPage.css';  // Import the CSS file for styling
import Navbar from '../components/Navbar';

const ServicesPage = () => {
    return (
        <>
        {/* <Navbar/> */}
        <section className="services">
            <div className="container">
                <h1 className="text-center">Our Services</h1>
                <div className="row">
                    {/* Alteration Card */}
                    <div className="col-md-4 col-sm-12">
                        <div className="service-card">
                            <img
                                src="/images/Image 2025-02-17 at 19.19.16_5308e183.jpg"
                                alt="Alteration"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Alteration</h5>
                                <p className="card-text">
                                    We provide professional alteration services to fit your needs and style. From resizing to adjustments, we ensure that your clothes fit perfectly.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stitching Card */}
                    <div className="col-md-4 col-sm-12">
                        <div className="service-card">
                            <img
                                src="/images/Image 2025-02-17 at 19.19.17_b4be14b8.jpg"
                                alt="Stitching"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Stitching</h5>
                                <p className="card-text">
                                    Our expert stitching service ensures precise and durable stitching, whether it's for repairs or creating new designs for your wardrobe.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customization Card */}
                    <div className="col-md-4 col-sm-12">
                        <div className="service-card">
                            <img
                                src="/images/Image 2025-02-17 at 19.19.17_054cab83.jpg"
                                alt="Customization"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Customization</h5>
                                <p className="card-text">
                                    Get your clothes customized with unique stitching patterns, designs, and fabrics. Express your individuality with a custom creation tailored just for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default ServicesPage;
