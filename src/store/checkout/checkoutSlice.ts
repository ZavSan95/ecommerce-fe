import { PaymentProvider } from '@/enum/payments-providers';
import { CheckoutAddress } from '@/interfaces/checkout-address';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  address: CheckoutAddress | null;
  paymentMethod: PaymentProvider | null; 
}

const initialState: CheckoutState = {
  address: null,
  paymentMethod: null, 
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<CheckoutAddress>) {
      state.address = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentProvider>) {
      state.paymentMethod = action.payload;
    },
    clearCheckout(state) {
      state.address = null;
      state.paymentMethod = null;
    },
  },
});

export const {
  setAddress,
  setPaymentMethod,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
