import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./EditProfile.css";

const EditProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        email: "",
        place: "",
        profilePicture: "",
        categories: [],
        workSamples: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/api/tailor/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const categoriesList = [
        { value: "Stitching", label: "Stitching" },
        { value: "Customization", label: "Customization" },
        { value: "Alterations", label: "Alterations" },
        { value: "Uniform Stitching", label: "Uniform Stitching" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
        }
    };

    const handleCategoryChange = (selectedOptions) => {
        setProfile({ ...profile, categories: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put("/api/tailor/profile", profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
            navigate("/tailor/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="profile-picture-section">
                    <img
                        src={profile.profilePicture || "default-avatar.png"}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={profile.email} disabled />
                </div>
                <div className="form-group">
                    <label>Place:</label>
                    <input type="text" name="place" value={profile.place} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Specialized Categories:</label>
                    <Select
                        isMulti
                        options={categoriesList}
                        value={profile.categories}
                        onChange={handleCategoryChange}
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate("/tailor/profile")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;