import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SET_FILTERS,
} from '../types/productActionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    filterBy: [],
    sortBy: '',
    sortDirection: '',
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_FILTERS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export default productReducer;
