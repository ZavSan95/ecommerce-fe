import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isInitialized = true;
    },

    clearAuth: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isInitialized = true;
    },

    setInitialized: state => {
      state.isInitialized = true; 
    },
  },
});

export const { setUser, clearAuth, setInitialized } = authSlice.actions;
export default authSlice.reducer;
