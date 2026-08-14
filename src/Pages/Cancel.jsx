import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      icon: "warning",
      title: "Payment Cancelled",
      text: "Your payment was cancelled. Your cart items are still saved.",
      showConfirmButton: false,
      timer: 3000,
    });
  }, []);

  const handleRetry = () => {
    navigate("/checkout");
  };

  const handleHome = () => {
    localStorage.removeItem("order");
    navigate("/");
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="card p-4 rounded-4 border-warning">
                <div className="text-center mb-4">
                  <div style={{ fontSize: "3rem" }}>✕</div>
                  <h1 className="text-warning">Payment Cancelled</h1>
                </div>

                <p className="text-center text-muted mb-4">
                  You cancelled the payment. Your cart items are still saved, so
                  you can retry whenever you're ready.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                  <button className="btn btn-warning btn-lg" onClick={handleRetry}>
                    Retry Payment
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={handleHome}>
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

export default Cancel;
