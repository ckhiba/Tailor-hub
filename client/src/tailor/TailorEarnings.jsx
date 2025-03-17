    import React, { useState } from "react";
    import "./TailorEarnings.css";
    import { FaMoneyBillWave, FaSearch } from "react-icons/fa";

    const TailorEarnings = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [earnings, setEarnings] = useState(1250);
    const [transactions, setTransactions] = useState([
        { id: 1, date: "2025-03-10", amount: 200, customer: "Aisha Khan", paymentMethod: "Credit Card" },
        { id: 2, date: "2025-03-08", amount: 150, customer: "John Doe", paymentMethod: "PayPal" },
        { id: 3, date: "2025-03-05", amount: 300, customer: "Sara Ali", paymentMethod: "Bank Transfer" },
        { id: 4, date: "2025-03-03", amount: 600, customer: "Michael Smith", paymentMethod: "UPI" },
    ]);

    // Filter transactions based on search query
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <div className="earnings-container">
            <h1 className="earnings-title">Earnings Overview</h1>

            {/* Earnings Summary */}
            <div className="earnings-summary">
            <FaMoneyBillWave className="earnings-icon" />
            <h2>Total Earnings</h2>
            <p>$ {earnings}</p>
            </div>

            {/* Transactions Section */}
            <div className="transactions-section">
            <div className="table-header">
                <h2>Recent Transactions</h2>
                {/* Search Bar Inside Table Section */}
                <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by Customer Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                </div>
            </div>

            <table className="transactions-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                </tr>
                </thead>
                <tbody>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.customer}</td>
                        <td>$ {transaction.amount}</td>
                        <td>{transaction.paymentMethod}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="4">No transactions found</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </>
    );
    };

    export default TailorEarnings;
