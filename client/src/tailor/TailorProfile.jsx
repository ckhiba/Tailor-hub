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
    const [selectedSample, setSelectedSample] = useState(null);

    // Fetch Tailor Profile
    useEffect(() => {
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
    }, []);

    //Upload Work Samples
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
                `http://localhost:5000/api/tailor/upload-work/${tailorId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Work sample uploaded successfully!");
            setProfile(res.data);
            setFile(null);
        } catch (error) {
            alert("Error uploading work sample.");
        }
    };

    // Delete Work Sample
    const deleteWorkSample = async (filename) => {
        const token = localStorage.getItem("token");
        const tailorId = localStorage.getItem("tailorId");

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/tailor/remove-work/${tailorId}/${filename}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Work sample removed successfully!");
            setProfile(res.data.tailor);
        } catch (error) {
            alert("Error removing work sample.");
        }
    };

    // Open Modal with Selected Sample
    const viewSampleDetails = (sample) => {
        setSelectedSample(sample);
    };

    //  Close Modal
    const closeModal = () => {
        setSelectedSample(null);
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
                    src={
                        profile.profilePic
                            ? `http://localhost:5000/uploads/${profile.profilePic.split("/").pop()}`
                            : "/images/default-profile.jpg"
                    }
                    alt="Tailor"
                    className="profile-picture"
                />
                <h2 className="tailor-name">{profile.name}</h2>
                <p className="tailor-contact">📞 {profile.phone}</p>
                <p className="tailor-contact">✉️ {profile.email}</p>
                <p className="tailor-experience">✂️ Experience: {profile.experience} years</p>

                {/*  Location and Services */}
                <p className="tailor-location">
                    📍 Location: {profile.location || "Location not specified"}
                </p>

                <p className="tailor-services">
                    🎽 Tailoring For:{" "}
                    <span>
                        {profile.services?.join(", ") || "No tailoring options selected"}
                    </span>
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

            {/* Show Work Samples */}
            {profile.workSamples && profile.workSamples.length > 0 ? (
                <div className="work-samples-gallery">
                    {profile.workSamples.map((sample, index) => {
                        const filename = sample.split("/").pop(); // Extract file name

                        return (
                            <div key={index} className="work-sample-item">
                                <img
                                    src={`http://localhost:5000/uploads/${filename}`}
                                    alt={`Sample ${index + 1}`}
                                    className="work-sample"
                                    onClick={() => viewSampleDetails(sample)} //  Open modal on click
                                />
                                <button
                                    className="remove-btn"
                                    onClick={() => deleteWorkSample(filename)}
                                >
                                    ❌
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="no-samples">No work samples uploaded.</p>
            )}

            {/* Modal to Show Image Details */}
            {selectedSample && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>
                            ❌
                        </span>
                        <h3>Sample Details</h3>
                        <img
                            src={`http://localhost:5000/uploads/${selectedSample.split("/").pop()}`}
                            alt="Selected Work Sample"
                            className="modal-image"
                        />
                    </div>
                </div>
            )}

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
