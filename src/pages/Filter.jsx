import React, { useState } from "react";
import { useOrders } from "../context/OrderContext.jsx";
import OrderItem from "../components/OrderItem.jsx";
import { Link } from "react-router-dom";

const Filter = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Interdependency: We must only reflect valid orders (Q1 rules)
  const validOrders = orders.filter((order) => {
    // Rules from Q1
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) return false;
    if (order.items.some((item) => (item.quantity || 0) <= 0)) return false;
    const amount = order.totalAmount ?? order.amount;
    if (amount === undefined || amount === null || isNaN(Number(amount))) return false;
    if (!order.orderId) return false;
    return true;
  });

  // 2. Filter by restaurent name (Case-insensitive)
  // We use .filter() as required by constraints
  const filteredOrders = validOrders.filter((order) =>
    (order.restaurent || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-page" style={{ padding: "20px" }}>
      <h1>Search Orders</h1>
      <Link to="/orders">Back to all orders</Link>
      <br /><br />

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter restaurent name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Validation Rules */}
      {!searchTerm ? (
        <p style={{ color: "red", marginTop: "15px" }}>Please enter a restaurant name to filter.</p>
      ) : filteredOrders.length === 0 ? (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>no results found</p>
      ) : (
        <div className="filtered-results" style={{ marginTop: "20px" }}>
          <h3>Results:</h3>
          {filteredOrders.map((order) => (
            <OrderItem key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
