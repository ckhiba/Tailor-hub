import React, { useState } from "react";
import TailorList from "../components/TailorList";
import "./ServiceSelection.css";

const ServiceSelection = () => {
    const [selectedService, setSelectedService] = useState("");

    const services = ["Stitching", "Alteration", "Customization", "Embroidery"];

    return (
        <div className="service-selection-container">
            <h2>Select a Service</h2>
            <div className="service-list">
                {services.map((service) => (
                    <button
                        key={service}
                        className={`service-btn ${selectedService === service ? "active" : ""}`}
                        onClick={() => setSelectedService(service)}
                    >
                        {service}
                    </button>
                ))}
            </div>
            {selectedService && <TailorList selectedService={selectedService} />}
        </div>
    );
};

export default ServiceSelection;
