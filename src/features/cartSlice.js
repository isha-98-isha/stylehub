import { createSlice } from "@reduxjs/toolkit";

// Helper to safely get the user email for dynamic localStorage keys
const getEmail = () => JSON.parse(localStorage.getItem("user"))?.email || "";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(`stylehub-cart-${getEmail()}`, JSON.stringify(state.items));
    },
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem(`stylehub-cart-${getEmail()}`, JSON.stringify(state.items));
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      localStorage.setItem(`stylehub-cart-${getEmail()}`, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(`stylehub-cart-${getEmail()}`);
    },
  },
});

export const { setCart, addItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
