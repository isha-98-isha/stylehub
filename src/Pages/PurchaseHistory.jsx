import React, { useEffect, useState } from "react";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container py-5">
          <h2 className="mb-4">Order History</h2>

          {orders.length === 0 ? (
            <div className="alert alert-info">No past orders found.</div>
          ) : (
            <div className="list-group">
              {orders.map((order) => (
            <div key={order.orderId} className="list-group-item mb-3">
                <h5>{order.orderId}</h5>
                <p><strong>Date:</strong> {order.timestamp}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <ul>
                {order.items.map((item, idx) => (
                    <li key={idx}>
                    {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                ))}
                </ul>
            </div>
        ))}

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
