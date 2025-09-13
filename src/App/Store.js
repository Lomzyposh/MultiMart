import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // adjust path

export const store = configureStore({
  reducer: {
    cart: cartReducer, // ✅ ensure the key is exactly "cart"
  },
});
