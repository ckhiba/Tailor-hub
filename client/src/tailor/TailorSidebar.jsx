import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCalendarCheck, FaEnvelope, FaDollarSign, FaUser, FaCloudUploadAlt } from "react-icons/fa";
import "./TailorSidebar.css";

const TailorSidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <ul className="nav-links">
                <li onClick={() => navigate("/tailor/orders")}><FaShoppingCart /> <span>Orders</span></li>
                <li onClick={() => navigate("/tailor/appointments")}><FaCalendarCheck /> <span>Appointments</span></li>
                <li onClick={() => navigate("/tailor/messages")}><FaEnvelope /> <span>Messages</span></li>
                <li onClick={() => navigate("/tailor/earnings")}><FaDollarSign /> <span>Earnings</span></li>
                <li onClick={() => navigate("/tailor/profile")}><FaUser /> <span>Profile</span></li>
                <li onClick={() => navigate("/tailor/upload-designs")}><FaCloudUploadAlt /> <span>Upload Designs</span></li>
            </ul>
        </aside>
    );
};

export default TailorSidebar;
