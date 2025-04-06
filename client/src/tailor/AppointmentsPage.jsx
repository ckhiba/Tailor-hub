import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Fetch appointments from backend
    const fetchAppointments = async () => {
        try {
            const response = await axios.get("/api/appointments"); // Replace with your API endpoint
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    // Handle Accept or Reject
    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            await axios.put(`/api/appointments/${id}`, { status: newStatus });
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: newStatus } : appointment
                )
            );
        } catch (error) {
            console.error("Error updating appointment status:", error);
        }
    };

    // View appointment details
    const viewDetails = (id) => {
        navigate(`/appointment-details/${id}`);
    };

    return (
        <div className="appointments-container">
            <h2 className="appointments-title">Appointments</h2>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Appointment Date</th>
                        <th>Time</th>
                        <th>Service Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.customerName}</td>
                            <td>{appointment.appointmentDate}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.serviceType}</td>
                            <td className={appointment.status.toLowerCase()}>{appointment.status}</td>
                            <td>
                                {appointment.status === "Pending" && (
                                    <>
                                        <button className="accept-btn" onClick={() => updateAppointmentStatus(appointment.id, "Accepted")}>
                                            Accept
                                        </button>
                                        <button className="reject-btn" onClick={() => updateAppointmentStatus(appointment.id, "Rejected")}>
                                            Reject
                                        </button>
                                    </>
                                )}
                                <button className="details-btn" onClick={() => viewDetails(appointment.id)}>
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsPage;
