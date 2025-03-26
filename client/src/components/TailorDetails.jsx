import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TailorDetails() {
    const { id } = useParams();
    const [tailor, setTailor] = useState(null);
    const [error, setError] = useState("");

    //  Fetch Tailor Details by ID
    useEffect(() => {
        const fetchTailorDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/tailor/${id}`);
                setTailor(res.data);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching tailor details.");
            }
        };

        fetchTailorDetails();
    }, [id]);

    if (error) {
        return <p className="error text-center">{error}</p>;
    }

    if (!tailor) {
        return <p className="loading text-center">Loading tailor details...</p>;
    }

    return (
        <section className="tailor-details">
            <div className="container">
                <h2 className="text-center">{tailor.name}'s Profile</h2>
                <div className="profile-section">
                    <img
                        src={
                            tailor.profilePic
                                ? `http://localhost:5000/uploads/${tailor.profilePic.split("/").pop()}`
                                : "/images/default-profile.jpg"
                        }
                        alt={tailor.name}
                        className="profile-pic"
                    />
                    <p>📞 {tailor.phone}</p>
                    <p>✉️ {tailor.email}</p>
                    <p>✂️ {tailor.experience} years of experience</p>
                </div>

                {/* Show Work Samples */}
                <h3>Work Samples</h3>
                <div className="sample-gallery">
                    {tailor.workSamples && tailor.workSamples.length > 0 ? (
                        tailor.workSamples.map((sample, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/uploads/${sample.split("/").pop()}`}
                                alt={`Sample ${index + 1}`}
                                className="work-sample"
                            />
                        ))
                    ) : (
                        <p>No work samples available.</p>
                    )}
                </div>

                {/* Appointment Button */}
                <button className="btn-appointment">📅 Book Appointment</button>
            </div>
        </section>
    );
}

export default TailorDetails;
