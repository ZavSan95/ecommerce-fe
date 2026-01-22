import { RootState } from "../store";

export const selectCartTotalItems = (state: RootState): number => {
  return state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
};
