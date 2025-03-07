import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./TailorDashboard.css";
import { FaShoppingCart, FaMoneyBillWave, FaEnvelope, FaBell, FaUser, FaCalendarCheck } from "react-icons/fa";
import TailorNavbar from "../components/TailorNavbar";

const TailorDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <>
      <TailorNavbar />
      <div className="tailor-dashboard">
        <div className="tailor-overlay"></div>
        <div className="dashboard-content">
          <h1 className="dashboard-title">Tailor Dashboard</h1>
          <div className="dashboard-widgets">
            <div className="widget orders" onClick={() => navigate("/orders")}>
              <FaShoppingCart className="widget-icon" />
              <h2>Orders</h2>
              <p>View and manage customer orders.</p>
            </div>
            <div className="widget appointments" onClick={() => navigate("/appointments")}>
              <FaCalendarCheck className="widget-icon" />
              <h2>Appointments</h2>
              <p>Schedule and manage appointments.</p>
            </div>
            <div className="widget notifications" onClick={() => navigate("/notifications")}>
              <FaBell className="widget-icon" />
              <h2>Notifications</h2>
              <p>Stay updated with the latest alerts.</p>
            </div>
            <div className="widget messages" onClick={() => navigate("/messages")}>
              <FaEnvelope className="widget-icon" />
              <h2>Messages</h2>
              <p>Communicate with customers.</p>
            </div>
            <div className="widget earnings" onClick={() => navigate("/earnings")}>
              <FaMoneyBillWave className="widget-icon" />
              <h2>Earnings</h2>
              <p>Track your income and payments.</p>
            </div>
            <div className="widget profile" onClick={() => navigate("/tailor/profile")}>
              <FaUser className="widget-icon" />
              <h2>Profile</h2>
              <p>Manage your tailor profile.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TailorDashboard;
