    import React, { useState } from "react";
    import "./MessengerPage.css";

    const TailorMessengerPage = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: "Aisha Khan" },
        { id: 2, name: "John Doe" },
    ]);
    const [activeCustomer, setActiveCustomer] = useState(customers[0]);
    const [messages, setMessages] = useState({
        1: [
        { id: 1, sender: "Customer", text: "Hello, I need a dress stitched." },
        { id: 2, sender: "Tailor", text: "Sure! What kind of dress?" },
        ],
        2: [
        { id: 1, sender: "Customer", text: "Can you alter my suit?" },
        { id: 2, sender: "Tailor", text: "Yes, when do you need it?" },
        ],
    });
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
        setMessages({
            ...messages,
            [activeCustomer.id]: [
            ...messages[activeCustomer.id],
            { id: messages[activeCustomer.id].length + 1, sender: "Tailor", text: newMessage },
            ],
        });
        setNewMessage("");
        }
    };

    return (
        <div className="messenger-container">
        <div className="customer-list">
            <h3>Customers</h3>
            {customers.map((customer) => (
            <div
                key={customer.id}
                className={`customer-item ${activeCustomer.id === customer.id ? "active" : ""}`}
                onClick={() => setActiveCustomer(customer)}
            >
                {customer.name}
            </div>
            ))}
        </div>
        <div className="chat-container">
            <h2 className="chat-title">Chat with {activeCustomer.name}</h2>
            <div className="messages-box">
            {messages[activeCustomer.id].map((msg) => (
                <div key={msg.id} className={msg.sender === "Tailor" ? "message tailor-message" : "message customer-message"}>
                <p>{msg.text}</p>
                </div>
            ))}
            </div>
            <div className="input-box">
            <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        </div>
    );
    };

    export default TailorMessengerPage;
