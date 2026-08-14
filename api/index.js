import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load environment variables from .env.local and .env
dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration to allow local dev and deployed frontend
app.use((req, res, next) => {
  const origin = req.headers.origin || "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

let cart = []; // simulate in-memory cart

// Helper function to safely instantiate Stripe
const getStripeInstance = () => {
  let stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY is missing from environment variables. Please check your Vercel settings.");
  }
  // Trim whitespace and strip any accidental double or single quotes
  stripeKey = stripeKey.trim().replace(/^["']|["']$/g, "");
  return new Stripe(stripeKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
};

// Health check routes
app.get(["/", "/api"], (req, res) => {
  res.send("Backend API is running!");
});

// Get cart
app.get(["/cart", "/api/cart"], (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post(["/cart", "/api/cart"], (req, res) => {
  const item = req.body;
  const existing = cart.find((p) => p.id === item.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  res.json({ message: "Cart updated", cart });
});

// Clear cart
app.delete(["/cart", "/api/cart"], (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

// Create Stripe Checkout Session
app.post(["/create-checkout-session", "/api/create-checkout-session"], async (req, res) => {
  try {
    const stripe = getStripeInstance();
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Cart is required and must be an array" });
    }

    // Determine domain for success/cancel redirect (local or production)
    const rawOrigin = req.headers.origin || req.headers.referer;
    let clientOrigin = "http://localhost:5173";
    if (rawOrigin) {
      const parsed = new URL(rawOrigin);
      clientOrigin = `${parsed.protocol}//${parsed.host}`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in paise
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${clientOrigin}/success`,
      cancel_url: `${clientOrigin}/cancel`,
    });

    console.log("Created Stripe session:", session.id);
    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default app;
