import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isSideMenuOpen: boolean;
  isCartOpen: boolean;
}

const initialState: UIState = {
  isSideMenuOpen: false,
  isCartOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {

    // -----------------
    // SIDE MENU
    // -----------------
    openSideMenu: (state) => {
      state.isSideMenuOpen = true;
      state.isCartOpen = false; 
    },
    closeSideMenu: (state) => {
      state.isSideMenuOpen = false;
    },
    toggleSideMenu: (state) => {
      const willOpen = !state.isSideMenuOpen;
      state.isSideMenuOpen = willOpen;
      if (willOpen) {
        state.isCartOpen = false;
      }
    },

    // -----------------
    // CART
    // -----------------
    openCart: (state) => {
      state.isCartOpen = true;
      state.isSideMenuOpen = false; 
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      const willOpen = !state.isCartOpen;
      state.isCartOpen = willOpen;
      if (willOpen) {
        state.isSideMenuOpen = false;
      }
    },
  },
});

export const {
  openSideMenu,
  closeSideMenu,
  toggleSideMenu,
  openCart,
  closeCart,
  toggleCart,
} = uiSlice.actions;

export default uiSlice.reducer;
