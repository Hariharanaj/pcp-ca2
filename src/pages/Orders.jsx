import React from "react";
import { useOrders } from "../context/OrderContext.jsx";
import OrderItem from "../components/OrderItem.jsx";

const Orders = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <div data-testid="loading">Loading orders...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;

  // Validation Logic based on requirements
  const validOrders = orders.filter((order) => {
    // 1. item array exists and is not empty
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) return false;

    // 2. all items must have quantity > 0
    const hasInvalidQuantity = order.items.some((item) => (item.quantity || 0) <= 0);
    if (hasInvalidQuantity) return false;

    // 3. total amount must be a valid number
    const amount = order.totalAmount ?? order.amount;
    if (amount === undefined || amount === null || isNaN(Number(amount))) return false;

    return true;
  });

  return (
    <div className="orders-page" data-testid="orders-page">
      <h1>Valid Food Delivery Orders</h1>
      <div className="orders-container">
        {validOrders.map((order) => (
          <OrderItem key={order.orderid || order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
