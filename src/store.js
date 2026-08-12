import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import cartReducer from "./features/cartSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
