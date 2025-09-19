import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { cartMiddleware } from './features/cart/cartSlice'; // adjust path

export const store = configureStore({
  reducer: {
    cart: cartReducer, // ✅ ensure the key is exactly "cart"
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
