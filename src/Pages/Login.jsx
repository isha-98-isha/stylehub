import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice"; // Adjust path as needed
import Swal from "sweetalert2";

export default function Login() { // Removed { setUser } prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === email && u.password === password);

    if (!existing) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid credentials or user not signed up!",
        confirmButtonColor: "#351d1d"
      });
      return;
    }

    // Replace the manual localStorage and setUser calls with the Redux action
    dispatch(loginUser(existing));

    Swal.fire({
      icon: "success",
      title: "Login successful!",
      showConfirmButton: false,
      timer: 1500
    });

    navigate("/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "15rem auto" }}>
      <div style={{
        background: "#ebe0e0",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{
            background: "#351d1d",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
