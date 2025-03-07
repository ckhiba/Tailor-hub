    import React from "react";
    import { useNavigate } from "react-router-dom";
    import "./TailorProfile.css";

    const TailorProfile = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/tailor/edit-profile"); // Navigates to Edit Profile Page
    };

    return (
        <div className="tailor-profile">
        <div className="profile-container">
            <div className="profile-image">
            <img src="https://via.placeholder.com/150" alt="Tailor Profile" />
            </div>
            <div className="profile-details">
            <h2>John Doe</h2>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Phone:</strong> +1234567890</p>
            <p><strong>Place:</strong> New York, USA</p>

            <div className="profile-categories">
                <h3>Specialized In</h3>
                <ul>
                <li>Alteration</li>
                <li>Customization</li>
                <li>Embroidery</li>
                </ul>
            </div>

            <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
            </div>
        </div>

        <div className="work-samples">
            <h3>Work Samples</h3>
            <div className="work-gallery">
            <img src="https://via.placeholder.com/200" alt="Work Sample 1" />
            <img src="https://via.placeholder.com/200" alt="Work Sample 2" />
            <img src="https://via.placeholder.com/200" alt="Work Sample 3" />
            </div>
        </div>
        </div>
    );
    };

    export default TailorProfile;
