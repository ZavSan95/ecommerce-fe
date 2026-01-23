import { CheckoutAddress } from "@/interfaces/checkout-address";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  address: CheckoutAddress | null;
  paymentMethod: 'mercadopago' | 'transferencia' | null;
}

const initialState: CheckoutState = {
    address: null,
    paymentMethod: null,
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<CheckoutAddress>){
            state.address = action.payload;
        },
        setPaymentMethod(state, action: PayloadAction<'mercadopago' | 'transferencia'>){
            state.paymentMethod = action.payload;
        },
        clearCheckout(state){
            state.address = null;
            state.paymentMethod = null;
        },
    },
});

export const {
    setAddress,
    setPaymentMethod,
    clearCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;