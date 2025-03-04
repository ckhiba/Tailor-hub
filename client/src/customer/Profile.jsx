    import React, { useState } from "react";
    import "./Profile.css";
import Navbar from "../components/Navbar";

    const Profile = () => {
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        location: "New York, USA",
        profileImage: "https://via.placeholder.com/150",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setUser({ ...user, profileImage: reader.result });
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="profile-container">
        <div className="profile-card">
            <div className="profile-image">
            <img src={user.profileImage} alt="Profile" />
            <input type="file" onChange={handleImageChange} />
            <button className="btn">Change Picture</button>
            </div>
            <div className="profile-details">
            <div className="input-group">
                <label>First Name</label>
                <input type="text" value={user.firstName} readOnly />
            </div>
            <div className="input-group">
                <label>Last Name</label>
                <input type="text" value={user.lastName} readOnly />
            </div>
            <div className="input-group">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
            </div>
            <div className="input-group">
                <label>Location</label>
                <input type="text" value={user.location} readOnly />
            </div>
            </div>
        </div>
        </div>
        </>
    );
    };

    export default Profile;
