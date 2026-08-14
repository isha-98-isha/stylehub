import app from "../../api/index.js";

const PORT = process.env.PORT || 5000;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("⚠️ Warning: STRIPE_SECRET_KEY is not defined in environment variables.");
} else {
  console.log("✅ STRIPE_SECRET_KEY successfully loaded.");
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));