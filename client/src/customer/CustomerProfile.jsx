import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./CustomerProfile.css";

const CustomerProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profilePic: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if profile is passed from EditCustomerProfile
        if (location.state?.updatedProfile) {
            setProfile(location.state.updatedProfile);
            setLoading(false);
        } else {
            fetchProfile();
        }
    }, [location.state]);

    // Fetch customer profile if not passed from edit page
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/customer/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching profile. Please try again.");
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="loading">Loading profile...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="customer-profile-container">
            <div className="profile-section">
                <img
                    src={
                        profile.profilePic
                            ? `http://localhost:5000/${profile.profilePic}`
                            : "/images/default-profile.png"
                    }
                    alt="Profile"
                    className="profile-picture"
                />
                <h2>{profile.name}</h2>
                <p>Email: {profile.email}</p>
                <p>Phone: {profile.phone}</p>
                <p>Address: {profile.address || "No address available"}</p>
                <button
                    className="edit-btn"
                    onClick={() => navigate("/customer/edit-profile")}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default CustomerProfile;
