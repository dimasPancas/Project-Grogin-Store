import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal untuk slice snackbar
const initialState = {
  title: '',        // Judul snackbar
  message: '',      // Isi pesan snackbar
  type: 'success',  // Tipe snackbar (misalnya 'success', 'error', 'warning')
  open: false,      // Status apakah snackbar sedang terbuka atau tidak
};

// Definisikan slice snackbar beserta reducer-nya
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    // Action untuk menampilkan snackbar
    showSnackbar: (state, action) => {
      const { title, message, type } = action.payload;

      state.title = title;
      state.message = message;
      state.type = type;
      state.open = true;
    },

    // Action untuk menyembunyikan snackbar
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Ekspor action
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

// Ekspor reducer
export default snackbarSlice.reducer;
