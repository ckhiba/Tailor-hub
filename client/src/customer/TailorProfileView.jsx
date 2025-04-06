import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TailorProfileView.css";

const TailorProfileView = () => {
    const { id } = useParams();
    const [tailor, setTailor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSample, setSelectedSample] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [measurementMethod, setMeasurementMethod] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState(""); // New state for instructions
    const [appointmentSuccess, setAppointmentSuccess] = useState(false);

    useEffect(() => {
        fetchTailorProfile(id);
    }, [id]);

    const fetchTailorProfile = async (id) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found. Please login again.");
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `http://localhost:5000/api/tailor/profile/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTailor(response.data);
            setLoading(false);
        } catch (error) {
            console.error(
                "Error fetching tailor profile:",
                error.response?.data?.message || error.message
            );
            setError("Error fetching tailor details.");
            setLoading(false);
        }
    };

    // Handle sample click to open modal
    const handleSampleClick = (sample) => {
        setSelectedSample(sample);
    };

    // Close sample modal
    const closeModal = () => {
        setSelectedSample(null);
    };

    // Function to calculate delivery date (7 days after the appointment)
    const calculateDeliveryDate = (appointmentDate) => {
        if (!appointmentDate) return "";
        const date = new Date(appointmentDate);
        date.setDate(date.getDate() + 7); // Add 7 days
        return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    };

    // Handle Appointment Booking
    const bookAppointment = async () => {
        if (!appointmentDate) {
            alert("Please select a date for your appointment.");
            return;
        }
        if (!measurementMethod) {
            alert("Please select a measurement method.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `http://localhost:5000/api/appointments/book`,
                {
                    tailorId: id,
                    date: appointmentDate,
                    measurementMethod: measurementMethod,
                    specialInstructions: specialInstructions, // Include special instructions
                    deliveryDate: calculateDeliveryDate(appointmentDate),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                setAppointmentSuccess(true);
                setTimeout(() => setAppointmentSuccess(false), 3000);
            } else {
                alert("Failed to book appointment.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error.message);
            alert("Error booking appointment. Please try again.");
        }
    };

    if (loading) return <p className="profile__loading">Loading profile...</p>;
    if (error) return <p className="profile__error">{error}</p>;

    return (
        <div className="profile__container">
            {/* Profile Header */}
            <div className="profile__header">
                <div className="profile__image-wrapper">
                    <img
                        src={`http://localhost:5000${tailor.profilePic}`}
                        alt="Tailor"
                        className="profile__image"
                    />
                </div>

                <div className="profile__info">
                    <h2 className="profile__name">{tailor.name}</h2>
                    <div className="profile__details">
                        <p className="profile__detail-item">
                            <strong>Email:</strong> {tailor.email}
                        </p>
                        <p className="profile__detail-item">
                            <strong>Phone:</strong> {tailor.phone}
                        </p>
                        <p className="profile__detail-item">
                            <strong>Location:</strong> {tailor.location}
                        </p>
                        <p className="profile__detail-item">
                            <strong>Experience:</strong> {tailor.experience} years
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories and Services */}
            <div className="profile__tags">
                {tailor.categories.map((category, index) => (
                    <div key={index} className="profile__tag">
                        {category}
                    </div>
                ))}
            </div>

            {/* Work Samples Section */}
            <h3 className="profile__section-title">Sample Work</h3>
            <div className="profile__samples">
                {tailor.workSamples.length > 0 ? (
                    tailor.workSamples.map((sample, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000${sample}`}
                            alt={`Sample ${index + 1}`}
                            className="profile__sample"
                            onClick={() => handleSampleClick(sample)}
                        />
                    ))
                ) : (
                    <p className="profile__no-samples">No samples available.</p>
                )}
            </div>

            {/* Modal to Show Enlarged Sample */}
            {selectedSample && (
                <div className="profile__modal-overlay" onClick={closeModal}>
                    <div
                        className="profile__modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="profile__modal-close" onClick={closeModal}>
                            &times;
                        </span>
                        <img
                            src={`http://localhost:5000${selectedSample}`}
                            alt="Enlarged Sample"
                            className="profile__modal-image"
                        />
                    </div>
                </div>
            )}

            {/* Book Appointment Section */}
            <h3 className="profile__section-title">Book Appointment</h3>
            <div className="profile__appointment">
                <label className="profile__label">Select Appointment Date:</label>
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="profile__appointment-date"
                />

                <label className="profile__label">Measurement Method:</label>
                <select
                    className="profile__appointment-method"
                    value={measurementMethod}
                    onChange={(e) => setMeasurementMethod(e.target.value)}
                >
                    <option value="">Select Measurement Method</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>

                <label className="profile__label">Special Instructions:</label>
                <textarea
                    className="profile__instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Enter special instructions for the tailor (e.g., fabric type, design preferences)"
                ></textarea>

                {appointmentDate && (
                    <p className="profile__delivery-date">
                        <strong>Estimated Delivery Date:</strong>{" "}
                        {calculateDeliveryDate(appointmentDate)}
                    </p>
                )}

                <button className="profile__appointment-btn" onClick={bookAppointment}>
                    Book Appointment
                </button>
            </div>

            {appointmentSuccess && (
                <p className="profile__success-message">
                    Appointment booked successfully!
                </p>
            )}
        </div>
    );
};

export default TailorProfileView;
