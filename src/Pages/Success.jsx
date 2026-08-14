import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import Swal from "sweetalert2";

function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderJSON = localStorage.getItem("order");
    if (orderJSON) {
      const order = JSON.parse(orderJSON);
      const orderWithId = {
        orderId: `ORD-${Date.now()}`,
        items: order, // ✅ store items array separately
        timestamp: new Date().toISOString(),
        status: "completed",
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(orderWithId);
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      localStorage.removeItem("order");

      // ✅ defer state update to avoid ESLint warning
      Promise.resolve().then(() => setOrderData(orderWithId));

      dispatch(clearCart());

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Your order ${orderWithId.orderId} has been placed.`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [dispatch]);

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="card p-4 rounded-4 border-success">
                <div className="text-center mb-4">
                  <div style={{ fontSize: "3rem" }}>✓</div>
                  <h1 className="text-success">Payment Successful!</h1>
                </div>

                {orderData && (
                  <div className="mb-4">
                    <div className="alert alert-info">
                      <strong>Order ID:</strong> {orderData.orderId}
                    </div>

                    <h5 className="mb-3">Order Details</h5>
                    <div className="mb-3">
                      {orderData.items.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between border-bottom py-2"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <strong>₹{item.price * item.quantity}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-2">
                      <h5>Total</h5>
                      <h5>
                        ₹
                        {orderData.items.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )}
                      </h5>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-muted">
                    Your order has been saved to your browser. You can view it
                    anytime.
                  </p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Success;
