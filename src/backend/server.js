import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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


// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body; // cart items from frontend

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map(item => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Stripe expects paise
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    
    console.log("Created Stripe session:", session.id);
    // Return the checkout URL instead of session ID
    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));