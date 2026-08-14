import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

function Checkout() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);

  if (!cart.length) {
    return (
      <div className="app-container">
        <main className="main-content">
          <div className="container py-5">
            <div className="alert alert-warning text-center">
              <h4>Your cart is empty</h4>
              <p>Please add items before checkout.</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      localStorage.setItem("order", JSON.stringify(cart));

      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Missing Stripe checkout URL");
    } catch (error) {
      console.error("Checkout failed:", error);
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error.message || "Something went wrong with checkout.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="card p-4 rounded-4">
                <h2 className="mb-4">Checkout</h2>

                <div className="mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5>Total</h5>
                  <h4>₹{total}</h4>
                </div>

                <button 
                  className="btn btn-success btn-lg w-100" 
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay with Stripe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
