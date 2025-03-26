    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "./OrderPage.css";

    const OrderPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        {
        id: 1,
        customerName: "Aisha Khan",
        dressType: "Lehenga",
        measurements: "Bust: 34, Waist: 28, Hips: 36",
        orderDate: "2025-03-05",
        deliveryDate: "2025-03-20",
        status: "In Process",
        },
        {
        id: 2,
        customerName: "John Doe",
        dressType: "Suit",
        measurements: "Chest: 40, Waist: 32, Length: 42",
        orderDate: "2025-03-06",
        deliveryDate: "2025-03-18",
        status: "Delivered",
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setOrders(
        orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
        )
        );
    };

    const viewDetails = (id) => {
        navigate(`/order-details/${id}`);
    };

    return (
        <div className="orders-container">
        <h2 className="orders-title">Orders</h2>
        <table className="orders-table">
            <thead>
            <tr>
                <th>Customer Name</th>
                <th>Dress Type</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                {/* <th>View Details</th> */}
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                <td>{order.customerName}</td>
                <td>{order.dressType}</td>
                <td>{order.orderDate}</td>
                <td>{order.deliveryDate}</td>
                <td className={order.status === "Delivered" ? "delivered" : "in-process"}>{order.status}</td>
                {/* <td>
                    <button className="details-btn" onClick={() => viewDetails(order.id)}>View Details</button>
                </td> */}
                <td>
                    {order.status !== "Delivered" && (
                    <button className="status-btn" onClick={() => updateStatus(order.id, "Delivered")}>Mark as Delivered</button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default OrderPage;
