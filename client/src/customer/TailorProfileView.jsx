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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    // Handle Appointment Booking
    const bookAppointment = async () => {
        if (!appointmentDate) {
            alert("Please select a date for your appointment.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Get JWT token from local storage

            const response = await axios.post(
                `http://localhost:5000/api/appointments/book`, // API endpoint
                {
                    tailorId: id, // Tailor ID fetched from URL
                    date: appointmentDate, // Selected date for the appointment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token for auth
                    },
                }
            );

            //  Check if the appointment was successful
            if (response.data.success) {
                setAppointmentSuccess(true); // Show success message
                setTimeout(() => setAppointmentSuccess(false), 3000); // Hide after 3s
            } else {
                alert("Failed to book appointment."); // Error message if booking fails
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
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="profile__appointment-date"
                />
                <button
                    className="profile__appointment-btn"
                    onClick={bookAppointment}
                >
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
