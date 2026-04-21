import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext.jsx";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useOrders();

  // Validate ID and find the order
  const order = orders.find((o) => String(o.orderId) === String(id));

  if (!order) {
    return (
      <div className="error-container">
        <h1>order not found</h1>
        <Link to="/orders">Go back to orders</Link>
      </div>
    );
  }

  // Calculate items with subtotals dynamically
  const itemsWithSubtotals = (order.items || []).map((item) => ({
    name: item.name || "unknown",
    subtotal: (Number(item.price) || 0) * (Number(item.quantity) || 0),
  }));

  return (
    <div className="order-details-view" style={{ padding: "20px" }}>
      <h2>Order Detail View</h2>
      <div className="details-card" style={{ border: "1px solid #333", padding: "15px", borderRadius: "5px" }}>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Customer:</strong> {order.customerName || "unknown"}</p>
        <p><strong>Restaurant:</strong> {order.restaurant || "N/A"}</p>
        
        <h3>Items</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {itemsWithSubtotals.map((item, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {item.name}: <strong>Subtotal: {item.subtotal}</strong>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "15px", fontSize: "1.2em" }}>
          <strong>Total Amount: {order.totalAmount || order.amount}</strong>
        </p>

        {/* Expected JSON-like output display for confirmation */}
        <div style={{ background: "#f4f4f4", padding: "10px", marginTop: "20px" }}>
          <pre>
{JSON.stringify({
  orderid: order.orderId,
  items: itemsWithSubtotals,
  totalamount: order.totalAmount || order.amount
}, null, 2)}
          </pre>
        </div>
      </div>
      <br />
      <Link to="/orders">Back to list</Link>
    </div>
  );
};

export default OrderDetails;
