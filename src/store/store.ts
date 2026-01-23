import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';
import cartReducer from './cart/cartSlice';
import { authReducer } from './auth';
import checkoutReducer from './checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart.items));
});

// Tipos útiles
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
