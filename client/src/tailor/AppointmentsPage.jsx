import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
const navigate = useNavigate();
const [appointments, setAppointments] = useState([
    {
    id: 1,
    customerName: "Aisha Khan",
    appointmentDate: "2025-03-15",
    time: "10:00 AM",
    serviceType: "Customization",
    status: "Scheduled",
    },
    {
    id: 2,
    customerName: "John Doe",
    appointmentDate: "2025-03-18",
    time: "2:00 PM",
    serviceType: "Alteration",
    status: "Completed",
    },
]);

const viewDetails = (id) => {
    navigate(`/appointment-details/${id}`);
};

const selectNewAppointment = () => {
    navigate("/new-appointment");
};

return (
    <div className="appointments-container">
    <h2 className="appointments-title">Appointments</h2>
    <button className="new-appointment-btn" onClick={selectNewAppointment}>Select New Appointment</button>
    <table className="appointments-table">
        <thead>
        <tr>
            <th>Customer Name</th>
            <th>Appointment Date</th>
            <th>Time</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>View Details</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map((appointment) => (
            <tr key={appointment.id}>
            <td>{appointment.customerName}</td>
            <td>{appointment.appointmentDate}</td>
            <td>{appointment.time}</td>
            <td>{appointment.serviceType}</td>
            <td className={appointment.status === "Completed" ? "completed" : "scheduled"}>{appointment.status}</td>
            <td>
                <button className="details-btn" onClick={() => viewDetails(appointment.id)}>View Details</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default AppointmentsPage;
