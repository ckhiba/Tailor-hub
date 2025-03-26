import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ViewProfile.css";

const ViewProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get updated profile if passed from EditProfile.jsx, otherwise null
    const [profile, setProfile] = useState(location.state?.updatedProfile || null);
    const [loading, setLoading] = useState(!profile); // Only load if no updated profile
    const [error, setError] = useState("");

    useEffect(() => {
        // If there's an updated profile passed from EditProfile, use it
        if (location.state?.updatedProfile) {
            setProfile(location.state.updatedProfile);
        } else {
            const fetchProfile = async () => {
                const token = localStorage.getItem("token");
                const tailorId = localStorage.getItem("tailorId");

                if (!token || !tailorId) {
                    setError("No token or tailor ID found. Please login.");
                    setLoading(false);
                    return;
                }

                try {
                    const res = await axios.get(
                        `http://localhost:5000/api/tailor/profile/${tailorId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setProfile(res.data);
                    setLoading(false);
                } catch (error) {
                    setError("Error fetching profile.");
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [location.state?.updatedProfile]); // Trigger effect when updatedProfile changes

    if (loading) {
        return <p className="loading">Loading profile...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="view-profile-container">
            <div className="profile-header">
                <img
                    src={
                        profile.profilePic
                            ? `http://localhost:5000${profile.profilePic}` // Correct path
                            : "/images/default-profile.jpg"
                    }
                    alt="Tailor"
                    className="profile-picture"
                />

                <h2 className="tailor-name">{profile.name}</h2>
                <p className="tailor-contact">📞 {profile.phone}</p>
                <p className="tailor-contact">✉️ {profile.email}</p>
                <p className="tailor-experience">
                    ✂️ Experience: {profile.experience || "No experience provided"} years
                </p>

                <p className="tailor-location">
                    📍 Location: {profile.location || "Location not specified"}
                </p>

                <p className="tailor-categories">
                    🧵 Services:{" "}
                    <span>
                        {profile.categories?.join(", ") || "No services selected"}
                    </span>
                </p>

                <p className="tailor-services">
                    🎽 Tailoring For:{" "}
                    <span>
                        {profile.services?.join(", ") || "No tailoring options selected"}
                    </span>
                </p>
            </div>

            <div className="button-group">
                <button
                    className="edit-btn"
                    onClick={() => navigate("/tailor/edit-profile")}
                >
                    Edit Profile
                </button>
                <button
                    className="back-btn"
                    onClick={() => navigate("/tailor/home")}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ViewProfile;
