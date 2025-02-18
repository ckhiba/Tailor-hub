import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutUsPage.css';
import Navbar from '../components/Navbar';

const AboutUsPage = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.from(textRef.current, { x: -100, opacity: 0, duration: 1.5, ease: "power3.out" });
    }, []);

    return (
        <>
        {/* <Navbar/> */}
        <section className="about-us">
            <div className="about-content">
                <div className="about-text" ref={textRef}>
                <h3>About Us</h3>
                    <p>
                        We are a team of expert tailors, driven by a passion to deliver the highest quality tailoring services. 
                        From custom creations to the most delicate alterations, we focus on the smallest details to ensure that 
                        your clothes fit perfectly and make you feel your best.
                    </p>
                </div>
                <div className="about-image">
                    <img src="/images/aboutus_image.jpg" alt="Tailoring Service" />
                </div>
            </div>
        </section>
        </>
    );
};

export default AboutUsPage;
