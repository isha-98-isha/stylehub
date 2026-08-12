import express from "express";
const app = express();
app.use(express.json());

// Allow requests from the Vite dev server during local development.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

let cart = []; // simulate localStorage

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// Get cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Add item
app.post("/cart", (req, res) => {
  const item = req.body;
  const existing = cart.find(p => p.id === item.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  res.json({ message: "Cart updated", cart });
});


// Clear cart
app.delete("/cart", (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
