import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TailorList.css";

const TailorList = () => {
    const { service } = useParams(); // ✅ Get service from URL
    const [tailors, setTailors] = useState([]);
    const [filteredTailors, setFilteredTailors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchLocation, setSearchLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (service) {
            fetchTailorsByService(service);
        }
    }, [service]);

    //  Fetch Tailors by Service
    const fetchTailorsByService = async (service) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/tailor/category/${service}`
            );
            setTailors(response.data);
            setFilteredTailors(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tailors:", error);
            setError(`No tailors found for ${service}`);
            setLoading(false);
        }
    };

    //  Filter Tailors
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        filterTailors(filter, searchLocation);
    };

    // Filter Tailors by Service & Location
    const filterTailors = (filter, location) => {
        let filtered = tailors;
        if (filter !== "All") {
            filtered = filtered.filter((tailor) => tailor.services.includes(filter));
        }
        if (location) {
            filtered = filtered.filter((tailor) =>
                tailor.location.toLowerCase().includes(location.toLowerCase())
            );
        }
        setFilteredTailors(filtered);
    };

    // Handle Search Input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchLocation(value);
        filterTailors(selectedFilter, value);
    };

    if (loading) return <p className="loading">Loading tailor data...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="tailor-list-container">
            <h3 className="section-title">Available Tailors for {service}</h3>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by location..."
                    value={searchLocation}
                    onChange={handleSearchChange}
                />
            </div>

            {/*  Filter Buttons */}
            <div className="filter-container">
                {["All", "Gents", "Women", "Girls", "Boys"].map((filter) => (
                    <button
                        key={filter}
                        className={`filter-btn ${
                            selectedFilter === filter ? "active" : ""
                        }`}
                        onClick={() => handleFilterChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/*  Tailor List */}
            <div className="tailor-card-container">
                {filteredTailors.length > 0 ? (
                    filteredTailors.map((tailor) => (
                        <div key={tailor._id} className="tailor-card">
                            {/* Left Side: Profile Image */}
                            <div className="tailor-left">
                                <img
                                    src={
                                        tailor.profilePic
                                            ? `http://localhost:5000${tailor.profilePic}`
                                            : "/default-profile.png"
                                    }
                                    alt={tailor.name}
                                    className="tailor-profile-pic"
                                />
                            </div>

                            {/* Right Side: Tailor Details */}
                            <div className="tailor-right">
                                <h4 className="tailor-name">{tailor.name}</h4>
                                <p className="tailor-detail">
                                    <strong>Location:</strong> {tailor.location || "Not specified"}
                                </p>
                                <p className="tailor-detail">
                                    <strong>Phone:</strong> {tailor.phone || "Not available"}
                                </p>

                                {/* Highlight Categories */}
                                <div className="tag-container">
                                    <strong>Categories:</strong>
                                    {Array.isArray(tailor.categories) &&
                                    tailor.categories.length > 0 ? (
                                        tailor.categories.map((category, index) => (
                                            <span key={index} className="highlight category">
                                                {category}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="highlight">None</span>
                                    )}
                                </div>

                                {/* Highlight Services */}
                                <div className="tag-container">
                                    <strong>Services:</strong>
                                    {Array.isArray(tailor.services) &&
                                    tailor.services.length > 0 ? (
                                        tailor.services.map((service, index) => (
                                            <span key={index} className="highlight service">
                                                {service}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="highlight">None</span>
                                    )}
                                </div>

                                {/* View Profile Button */}
                                <button
                                    className="view-profile-btn"
                                    onClick={() => navigate(`/tailor-profile/${tailor._id}`)}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No tailors available for this service.</p>
                )}
            </div>
        </div>
    );
};

export default TailorList;
