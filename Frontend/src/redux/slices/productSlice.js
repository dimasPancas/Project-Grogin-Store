// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters) => {
  const response = await axios.get('https://localhost:7249/api/Product', {
    params: {
      PageNumber: 1,
      PageSize: 6,
      search: filters.searchQuery,
      sortBy: filters.sortBy,
      sortDirection: filters.sortDirection,
      CategoryId: filters.CategoryId,
    },
  });
  return response.data.data.items;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    filters: {
      searchQuery: '',
      sortBy: '',
      sortDirection: 'ascending',
      CategoryId: '',
    },
    products: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
