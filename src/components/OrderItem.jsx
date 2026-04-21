import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const { orderId, customerName, restaurant, rating } = order;
  const displayId = orderId;

  return (
    <div className="order-card" data-testid="order-item" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px" }}>
      <Link to={`/order/${displayId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h3>Order ID: {displayId}</h3>
        <p>Customer: {customerName || "unknown"}</p>
        <p>Restaurant: {restaurant}</p>
        {rating && <p>Rating: {rating} ⭐</p>}
      </Link>
    </div>
  );
};

export default OrderItem;
