import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TailorProfile.css";

const TailorProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const tailorId = localStorage.getItem("tailorId");

            if (!token) {
                setError("No token found! Please login.");
                setLoading(false);
                return;
            }

            if (!tailorId || tailorId === "null") {
                setError("No tailor ID found! Please login.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5000/api/tailor/profile/${tailorId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data || {});
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <h2 className="loading">Loading...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="tailor-profile-container">
            <h2 className="profile-title">Tailor Profile</h2>
            <div className="profile-header">
                <img 
                    src={profile?.profileImage || "https://via.placeholder.com/150"} 
                    alt="Profile" 
                    className="profile-picture" 
                />
                <div className="tailor-info">
                    <h3>{profile?.name || "N/A"}</h3>
                    <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {profile?.phone || "N/A"}</p>
                    <p><strong>Place:</strong> {profile?.place || "Not provided"}</p>
                    <p><strong>Categories:</strong> {profile?.categories?.length ? profile.categories.join(", ") : "None"}</p>
                </div>
            </div>
            <div className="button-group">
                <button className="edit-profile-btn" onClick={() => navigate("/tailor/edit-profile")}>Edit Profile</button>
            </div>

            <div className="work-samples">
                <h3 className="section-title">Work Samples</h3>
                <div className="gallery">
                    {profile?.workSamples?.length > 0 ? (
                        profile.workSamples.map((sample, index) => (
                            <div key={index} className="work-sample">
                                <img 
                                    src={sample} 
                                    alt={`Work Sample ${index + 1}`} 
                                    className="work-image" 
                                />
                            </div>
                        ))
                    ) : (
                        <p>No work samples uploaded.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default TailorProfile;
