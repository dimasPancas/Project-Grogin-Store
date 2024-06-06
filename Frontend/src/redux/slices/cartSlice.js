import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer untuk menambahkan item ke kerangjang
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Menambahkan item ke cartItems
      state.itemCount += action.payload.quantity; // Menambahkan jumlah item
    },
    // Reducer untuk menghapus item dari keranjang
    removeFromCart: (state, action) => {
      const removedItemId = action.payload;
      const removedItem = state.cartItems.find(item => item.id === removedItemId);
      state.cartItems = state.cartItems.filter(item => item.id !== removedItemId);
      state.itemCount -= removedItem ? removedItem.quantity : 0;
    },
    // Reducer untuk mengatur item di keranjang
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.itemCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
