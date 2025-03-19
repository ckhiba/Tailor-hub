import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TailorProfile.css";

const TailorProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const tailorId = localStorage.getItem("tailorId");
            console.log("Fetched Tailor ID:", tailorId); // Debug log

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
    }, []);

    //  Upload Work Samples
    const uploadWorkSample = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const token = localStorage.getItem("token");
        const tailorId = localStorage.getItem("tailorId");

        const formData = new FormData();
        formData.append("workSample", file);

        try {
            const res = await axios.post(
                `http://localhost:5000/api/tailor/upload/${tailorId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Work sample uploaded successfully!");
            setProfile(res.data); // Update profile with new work samples
            setFile(null); // Clear file input
        } catch (error) {
            alert("Error uploading work sample.");
        }
    };

    if (loading) {
        return <p className="loading">Loading profile...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="tailor-profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <img
                    src={profile.profilePic || "/images/default-profile.jpg"}
                    alt="Tailor"
                    className="profile-picture"
                />
                <h2 className="tailor-name">{profile.name}</h2>
                <p className="tailor-contact">📞 {profile.phone}</p>
                <p className="tailor-contact">✉️ {profile.email}</p>
                <p className="tailor-experience">
                    ✂️ Experience: {profile.experience}years
                </p>

                {/* Categories Display */}
                <div className="tailor-categories">
                    🧵 <strong>Specialized Categories:</strong>
                    {profile.categories && profile.categories.length > 0 ? (
                        <div className="categories-lists">
                            {profile.categories.map((category, index) => (
                                <span key={index} className="category-badges">
                                    {category}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="no-category">No categories selected</p>
                    )}
                </div>
            </div>

            {/* Upload Work Samples */}
            <div className="upload-samples">
                <h3>📸 Upload Work Samples</h3>
                <form onSubmit={uploadWorkSample}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="submit" className="upload-btn">
                        Upload Sample
                    </button>
                </form>
            </div>

            {/* Work Samples Section */}
            <div className="work-samples-section">
                <h3>✨ Tailor's Work Samples</h3>
                {profile.workSamples && profile.workSamples.length > 0 ? (
                    <div className="work-samples-gallery">
                        {profile.workSamples.map((sample, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000${sample}`}
                                alt={`Sample ${index + 1}`}
                                className="work-sample"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-samples">No work samples uploaded.</p>
                )}
            </div>

            {/* Button Group */}
            <div className="button-group">
                <button
                    className="view-btn"
                    onClick={() => navigate("/tailor/view-profile")}
                >
                    View Profile
                </button>
                <button
                    className="edit-btn"
                    onClick={() => navigate("/tailor/edit-profile")}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default TailorProfile;
