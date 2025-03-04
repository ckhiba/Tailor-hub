import React from 'react';

function Service() {
    return (
        <>
        <section className="services">
            <div className="container">
                <h1 className="text-center">Our Services</h1>
                <div className="row">
                    {/* Alteration Card */}
                    <div className="col-md-3 col-sm-12">
                        <div className="service-card">
                            <img src="/images/Image 2025-02-17 at 19.19.16_5308e183.jpg" alt="Alteration" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Alteration</h5>
                                <p className="card-text">
                                    We provide professional alteration services to fit your needs and style.
                                </p>
                                <button className="btn-custom">Book Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Stitching Card */}
                    <div className="col-md-3 col-sm-12">
                        <div className="service-card">
                            <img src="/images/Image 2025-02-17 at 19.19.17_b4be14b8.jpg" alt="Stitching" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Stitching</h5>
                                <p className="card-text">
                                    Our expert stitching service ensures precise and durable stitching.
                                </p>
                                <button className="btn-custom">Book Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Customization Card */}
                    <div className="col-md-3 col-sm-12">
                        <div className="service-card">
                            <img src="/images/Image 2025-02-17 at 19.19.17_054cab83.jpg" alt="Customization" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Customization</h5>
                                <p className="card-text">
                                    Get your clothes customized with unique stitching patterns and designs.
                                </p>
                                <button className="btn-custom">Book Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Uniform Stitching Card */}
                    <div className="col-md-3 col-sm-12">
                        <div className="service-card">
                            <img src="/images/stitching.jpg" alt="Uniform Stitching" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Uniform Stitching</h5>
                                <p className="card-text">
                                    Get professionally tailored uniforms for schools, offices, and more.
                                </p>
                                <button className="btn-custom">Book Now</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </>
    );
}

export default Service;
