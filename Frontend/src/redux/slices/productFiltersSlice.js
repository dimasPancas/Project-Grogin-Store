import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  pageNumber: 1,
  pageSize: 6,
  sortBy: '',
  sortDirection: '',
  categoryId: '',
  categories: [],
};

const productFiltersSlice = createSlice({
  name: 'productFilters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
  },
});

export const { setFilters, setSearch, setCategories, setSortDirection } = productFiltersSlice.actions;
export default productFiltersSlice.reducer;
