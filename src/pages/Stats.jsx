import React from "react";
import { useOrders } from "../context/OrderContext.jsx";
import { Link } from "react-router-dom";

const Stats = () => {
  const { totalOrders, deliveredOrders, cancelledOrders } = useOrders();

  return (
    <div className="stats-page">
      <h1>Order Statistics</h1>
      <nav><Link to="/orders">Orders</Link> | <Link to="/filter">Filter</Link></nav>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p data-testid="total-orders">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Delivered Orders</h3>
          <p data-testid="delivered-orders">{deliveredOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Cancelled Orders</h3>
          <p data-testid="cancelled-orders">{cancelledOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
