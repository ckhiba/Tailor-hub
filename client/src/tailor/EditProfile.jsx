import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
const navigate = useNavigate();

const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    place: "New York, USA",
    profileImage: "https://via.placeholder.com/150",
    categories: ["Alteration", "Customization", "Embroidery"],
    workSamples: [],
});

const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
};

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfile({ ...profile, profileImage: imageUrl });
    }
};

const handleWorkSampleUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setProfile({ ...profile, workSamples: [...profile.workSamples, ...images] });
};

const handleSave = () => {
    console.log("Profile Updated:", profile);
    navigate("/profile"); // Navigate back to profile page
};

return (
    <div className="edit-profile">
    <h2>Edit Profile</h2>
    <div className="edit-form">
        <label>Profile Image:</label>
        <input type="file" onChange={handleImageUpload} />
        <img src={profile.profileImage} alt="Profile" className="preview-image" />

        <label>Name:</label>
        <input type="text" name="name" value={profile.name} onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" value={profile.email} onChange={handleInputChange} />

        <label>Phone:</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />

        <label>Place:</label>
        <input type="text" name="place" value={profile.place} onChange={handleInputChange} />

        <label>Specialized Categories:</label>
        <input type="text" name="categories" value={profile.categories.join(", ")} onChange={(e) => setProfile({ ...profile, categories: e.target.value.split(", ") })} />

        <label>Upload Work Samples:</label>
        <input type="file" multiple onChange={handleWorkSampleUpload} />
        <div className="work-preview">
        {profile.workSamples.map((sample, index) => (
            <img key={index} src={sample} alt={`Work Sample ${index + 1}`} />
        ))}
        </div>

        <button className="save-btn" onClick={handleSave}>Save Profile</button>
    </div>
    </div>
);
};

export default EditProfile;
