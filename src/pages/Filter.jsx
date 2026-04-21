import React, { useState } from "react";
import { useOrders } from "../context/OrderContext.jsx";
import OrderItem from "../components/OrderItem.jsx";
import { Link } from "react-router-dom";

const Filter = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Interdependency: We must only reflect valid orders (Q1 rules)
  const validOrders = orders.filter((order) => {
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) return false;
    if (order.items.some((item) => (item.quantity || 0) <= 0)) return false;
    const amount = order.totalAmount ?? order.amount;
    if (amount === undefined || amount === null || isNaN(Number(amount))) return false;
    if (!order.orderId) return false;
    return true;
  });

  // Get unique restaurant names for the user to see
  const availableRestaurants = Array.from(new Set(validOrders.map(o => o.restaurant).filter(Boolean)));

  // 2. Filter by restaurant name (Case-insensitive)
  const filteredOrders = validOrders.filter((order) =>
    (order.restaurant || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-page" style={{ padding: "20px" }}>
      <h1>Search Orders</h1>
      <Link to="/orders">Back to all orders</Link>
      <br /><br />

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Side: Search */}
        <div style={{ flex: 1 }}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Type restaurant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {!searchTerm ? (
            <p style={{ color: "red", marginTop: "15px" }}>Please enter a restaurant name to filter.</p>
          ) : filteredOrders.length === 0 ? (
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>no results found</p>
          ) : (
            <div className="filtered-results" style={{ marginTop: "20px" }}>
              <h3>Results ({filteredOrders.length}):</h3>
              {filteredOrders.map((order) => (
                <OrderItem key={order.orderId} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Available Restaurants List */}
        <div style={{ width: "250px", background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
          <h4>Available Restaurants:</h4>
          <ul style={{ paddingLeft: "15px" }}>
            {availableRestaurants.map((res, idx) => (
              <li key={idx} 
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline", marginBottom: "5px" }}
                  onClick={() => setSearchTerm(res)}>
                {res}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filter;
