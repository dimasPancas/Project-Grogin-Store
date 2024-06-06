/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Collapse, TextField, Button, Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function AddCategory({ openAddModal, handleAddModalClose, handleCategoryAdded }) {
  const [newCategory, setNewCategory] = useState({ name: "" });
  const apiCategoriesUrl = "https://localhost:7249/api/Category/admin";
  const dispatch = useDispatch();

  const handleAddCategorySubmit = () => {
    axios.post(apiCategoriesUrl, newCategory)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        handleAddModalClose();
        // Reset data kategori baru
        setNewCategory({ name: "" });
        handleCategoryAdded();
        dispatch(showSnackbar({ title: 'Success', message: 'Kategori berhasil ditambahkan', type: 'success' }));
      })
      .catch(error => {
        console.error("Terjadi kesalahan saat menambahkan kategori:", error);
        dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat menambahkan kategori', type: 'error' }));
      });
  };

  const handleChange = (event) => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });
  };

  return (
    <Collapse in={openAddModal}>
      <Box p={2}>
        <TextField
          label="Nama Kategori"
          name="name"
          value={newCategory.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleAddCategorySubmit}
          sx={{ bgcolor: "#634C9F", color: "white", mt: 2 }}
        >
          Tambah Kategori
        </Button>
      </Box>
    </Collapse>
  );
}
