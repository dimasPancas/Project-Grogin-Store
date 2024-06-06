import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  isLoggedIn: false,
  authToken: null,
  username: null,
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token } = action.payload;
      state.authToken = token;
      state.isLoggedIn = true;
      const decodedToken = jwtDecode(token);
      state.username = decodedToken.given_name;
      state.userRole = decodedToken.role;
      localStorage.setItem('token', token);
    },
    registerLogin(state, action) {
      const { token } = action.payload;
      state.authToken = token;
      state.isLoggedIn = true;
      const decodedToken = jwtDecode(token);
      state.username = decodedToken.given_name;
      state.userRole = decodedToken.role;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.authToken = null;
      state.isLoggedIn = false;
      state.username = null;
      state.userRole = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, registerLogin, logout } = authSlice.actions;

export default authSlice.reducer;
