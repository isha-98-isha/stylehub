import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import Swal from "sweetalert2";

export default function Signup() { // Prop removed
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === email);
    
    if (existing) {
      Swal.fire({
        icon: "warning",
        title: "User already exists",
        text: "Please login instead.",
        confirmButtonColor: "#351d1d"
      });
      navigate("/login");
      return;
    }

    const newUser = { email, password, username };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Dispatching the login action instantly binds user state globally
    dispatch(loginUser(newUser));

    Swal.fire({
      icon: "success",
      title: "Signup successful!",
      text: "Welcome to StyleHub 🎉",
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
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Sign Up</h2>
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Register
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
