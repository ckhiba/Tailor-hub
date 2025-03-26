import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditCustomerProfile.css";

const EditCustomerProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        address: "",
        profilePic: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/customer/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching profile.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", profile.name);
        formData.append("phone", profile.phone);
        formData.append("address", profile.address);
        if (selectedFile) {
            formData.append("profilePic", selectedFile);
        }

        try {
            //  Save updated data to backend
            await axios.put("http://localhost:5000/api/customer/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Profile updated successfully!");
//  Redirect to Customer Profile after saving
            navigate("/customer/home");
        } catch (error) {
            alert("Error updating profile.");
        }
        setLoading(false);
    };

    if (loading) {
        return <p className="loading">Loading profile...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default EditCustomerProfile;
