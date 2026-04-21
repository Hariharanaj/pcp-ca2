import React, { useState } from "react";
import { useOrders } from "../context/OrderContext.jsx";
import { Link } from "react-router-dom";

const Filter = () => {
  const { orders } = useOrders();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(o => (o.status || "").toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="filter-page">
      <h1>Filter Orders</h1>
      <nav><Link to="/orders">Orders</Link> | <Link to="/stats">Stats</Link></nav>
      
      <div className="filter-controls">
        <label>Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <ul className="orders-list">
        {filteredOrders.map((order) => (
          <li key={order.id} data-testid="order-item">
            Order #{order.id} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
