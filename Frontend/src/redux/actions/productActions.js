import axios from "axios";

export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const fetchProducts = (filters) => async (dispatch) => {
  try {
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
    dispatch(setProducts(response.data.data.items));
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});
