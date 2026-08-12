import { useEffect } from "react";
import './App.css';
import Home from './Pages/Home';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Accessories from './Pages/Accessories';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import Cart from './Pages/Cart';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Swal from "sweetalert2";
import ProductDetail from "./Pages/ProductDetails";
import ScrollManager from "./ScrollManager";

// Redux hooks and actions
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./features/userSlice";
import { setCart, clearCart } from "./features/cartSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract values reactively from Redux state
  const { currentUser } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);

  // Sync user-specific cart upon mounting or logging in/out
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`stylehub-cart-${currentUser.email}`);
      dispatch(setCart(stored ? JSON.parse(stored) : []));
    } else {
      dispatch(clearCart());
    }
  }, [currentUser, dispatch]);

  // Derived count calculation from the Redux array
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#351d1d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        Swal.fire({
          icon: "info",
          title: "Logged out",
          text: "You have been logged out successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/login");
      }
    });
  };

  return (
    <>
      <header className="header">
        <h1>StyleHub</h1>
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/men" className={({ isActive }) => isActive ? "active" : ""}>Men</NavLink>
          <NavLink to="/women" className={({ isActive }) => isActive ? "active" : ""}>Women</NavLink>
          <NavLink to="/accessories" className={({ isActive }) => isActive ? "active" : ""}>Accessories</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Cart ({cartCount})</NavLink>
          {currentUser ? (
            <button
              onClick={logout}
              style={{
                background: "#351d1d",
                color: "#fff",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "10px"
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink>
            </>
          )}
        </nav>
      </header>

      <ScrollManager />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/men" element={<ProtectedRoute><Men /></ProtectedRoute>} />
        <Route path="/women" element={<ProtectedRoute><Women /></ProtectedRoute>} />
        <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
      </Routes>

      <footer className="footer">
        <p>© 2026 StyleHub. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
