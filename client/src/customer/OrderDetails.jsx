import React from "react";
import "./OrderDetails.css"; // Import CSS file
import Navbar from "../components/Navbar";

const OrderDetails = () => {
    const order = {
        orderId: "ORD123456",
        customerName: "John Doe",
        tailorName: "Elegant Stitches",
        dressType: "Custom Suit",
        fabric: "Cotton Blend",
        measurements: "Chest: 38, Waist: 32, Length: 40",
        orderDate: "Feb 25, 2025",
        deliveryDate: "Mar 10, 2025",
        status: "In Progress",
        totalCost: "$120",
        paymentStatus: "Paid",
    };

    return (
        <>
        <Navbar/>
        <div className="order-container">
            <div className="order-card">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Tailor:</strong> {order.tailorName}</p>
                <p><strong>Dress Type:</strong> {order.dressType}</p>
                <p><strong>Fabric:</strong> {order.fabric}</p>
                <p><strong>Measurements:</strong> {order.measurements}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                <p><strong>Total Cost:</strong> {order.totalCost}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <button className="btn-track">Track Order</button>
            </div>
        </div>
        </>
    );
};

export default OrderDetails;
