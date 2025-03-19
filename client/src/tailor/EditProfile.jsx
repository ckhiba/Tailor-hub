import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select"; // ✅ For multi-select
import "./EditProfile.css";

const categoryOptions = [
    { value: "Alteration", label: "Alteration" },
    { value: "Stitching", label: "Stitching" },
    { value: "Uniform Stitching", label: "Uniform Stitching" },
    { value: "Customization", label: "Customization" },
];

const EditProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        email: "",
        experience: 0,
        categories: [],
        profilePic: "", //  New field for profilePic
    });
    const [selectedFile, setSelectedFile] = useState(null); //  For storing the uploaded file
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            const tailorId = localStorage.getItem("tailorId");

            if (!token || !tailorId) {
                setError("No token or tailor ID found. Please login.");
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
            } catch (error) {
                setError("Error fetching profile.");
            }
        };

        fetchProfile();
    }, []);

    //  Handle text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    //  Handle category selection
    const handleCategoryChange = (selectedOptions) => {
        const selectedCategories = selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [];
        setProfile({ ...profile, categories: selectedCategories });
    };

    //  Handle file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); //  Store the selected file
    };

    //  Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const tailorId = localStorage.getItem("tailorId");

            //  Create FormData to send profile + image
            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("phone", profile.phone);
            formData.append("email", profile.email);
            formData.append("experience", profile.experience);
            formData.append("categories", JSON.stringify(profile.categories));

            //  Only append file if selected
            if (selectedFile) {
                formData.append("profilePic", selectedFile);
            }

            //  Send FormData via PUT request
            const res = await axios.put(
                `http://localhost:5000/api/tailor/update-profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Profile updated successfully!");

            //  Pass updated profile directly
            navigate("/tailor/view-profile", { state: { updatedProfile: res.data.tailor } });
        } catch (error) {
            setError("Error updating profile.");
        }
        setLoading(false);
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            {error && <p className="error">{error}</p>}
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Experience (in years):</label>
                    <input
                        type="number"
                        name="experience"
                        value={profile.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Specialized Categories:</label>
                    <Select
                        isMulti
                        options={categoryOptions}
                        value={categoryOptions.filter((option) =>
                            profile.categories.includes(option.value)
                        )}
                        onChange={handleCategoryChange}
                        classNamePrefix="react-select"
                    />
                </div>
                {/*  New Field to Upload Profile Pic */}
                <div className="form-group">
                    <label>Upload Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="button-group">
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/tailor/view-profile")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
