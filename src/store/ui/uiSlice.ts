import { createSlice } from "@reduxjs/toolkit";

interface UIState{
    isSideMenuOpen: boolean;
}

const initialState: UIState = {
    isSideMenuOpen: false,
};

export const uiSlice = createSlice({

    name: 'ui',
    initialState,
    reducers: {
        openSideMenu: (state) => {
            state.isSideMenuOpen = true;
        },
        closeSideMenu: (state) => {
            state.isSideMenuOpen = false;
        },
        toggleSideMenu: (state) => {
            state.isSideMenuOpen = !state.isSideMenuOpen;
        },
    },
});

export const {
  openSideMenu,
  closeSideMenu,
  toggleSideMenu,
} = uiSlice.actions;

export default uiSlice.reducer;