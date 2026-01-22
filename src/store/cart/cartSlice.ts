import { CartItem } from '@/interfaces/cart-item.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadCartFromStorage } from './cart.utils';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;

      const existing = state.items.find(
        i =>
          i.productId === item.productId &&
          i.variantSku === item.variantSku
      );

      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity += item.quantity;
        }
      } else {
        state.items.push(item);
      }
    },

    removeItem(state, action: PayloadAction<{ productId: string; variantSku: string }>) {
      state.items = state.items.filter(
        i =>
          !(
            i.productId === action.payload.productId &&
            i.variantSku === action.payload.variantSku
          )
      );
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; variantSku: string; quantity: number }>
    ) {
      const item = state.items.find(
        i =>
          i.productId === action.payload.productId &&
          i.variantSku === action.payload.variantSku
      );

      if (item) {
        item.quantity = Math.max(1, Math.min(action.payload.quantity, item.stock));
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
