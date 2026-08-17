import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, clearCart } from "../features/cartSlice";
import Swal from 'sweetalert2';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

const handleCheckout = () => {
  if (cart.length === 0) {
    // SweetAlert2 popup instead of alert()
    Swal.fire({
      icon: 'warning',          // warning, error, success, info, question
      title: 'Cart is Empty',
      text: 'Please add items to your cart before checking out.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  // Save order to localStorage
  localStorage.setItem("order", JSON.stringify(cart));

  // Navigate to checkout
  navigate("/checkout");
};



  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="cart-card p-4 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h1>Your Cart</h1>
                    <p className="text-muted">Total Items: {cart.length}</p>
                  </div>
                  <button className="btn btn-dark" onClick={() => dispatch(clearCart())}>
                    Clear Cart
                  </button>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <button className="btn btn-dark" onClick={() => navigate("/history")}>
                  Order History
                  </button>
                  </div>

                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <h6 className="cart-item-name mb-1">
                        <Link to={`/product/${item.id}`} state={{ product: item }}>
                          {item.name}
                        </Link>
                      </h6>
                      <span className="cart-item-price">
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <button className="btn btn-light" onClick={() => dispatch(decreaseQty(item.id))}>
                        -
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button className="btn btn-light" onClick={() => dispatch(increaseQty(item.id))}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <span>Total Amount:
                    ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </span>
                   <button className="btn btn-primary mt-3" onClick={handleCheckout}>
                    Checkout
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

export default Cart;
