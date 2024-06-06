import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbarSlice';
import cartReducer from './slices/cartSlice';
import productFiltersSlice from './slices/productFiltersSlice';
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    snackbar: snackbarReducer,
    productFilters: productFiltersSlice,
    auth: authReducer,
  },
  devTools: true,
});

export default store;
