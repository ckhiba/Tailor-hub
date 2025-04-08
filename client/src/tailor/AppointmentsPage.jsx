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
            const token = localStorage.getItem("token");

            const response = await axios.get("http://localhost:5000/api/appointments", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Check if response.data is an array or wrapped inside an object
            const fetchedAppointments = Array.isArray(response.data)
                ? response.data
                : response.data.appointments || [];

            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]); // fallback to empty array on error
        }
    };

    // Handle Accept or Reject
    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/appointments/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === id ? { ...appointment, status: newStatus } : appointment
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
            {appointments.length === 0 ? (
                <p className="no-appointments">No appointments found.</p>
            ) : (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Appointment Date</th>
                            <th>Measurement Method</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{appointment.customerName || "N/A"}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.measurementMethod}</td>
                                <td className={appointment.status?.toLowerCase()}>{appointment.status}</td>
                                <td>
                                    {appointment.status === "Pending" && (
                                        <>
                                            <button
                                                className="accept-btn"
                                                onClick={() => updateAppointmentStatus(appointment._id, "Accepted")}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={() => updateAppointmentStatus(appointment._id, "Rejected")}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button className="details-btn" onClick={() => viewDetails(appointment._id)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppointmentsPage;
