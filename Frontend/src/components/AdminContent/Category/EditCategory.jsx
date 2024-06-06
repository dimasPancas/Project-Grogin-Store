/* eslint-disable react/prop-types */
import { useState } from "react";
import { Collapse, TextField, Button, FormGroup } from "@mui/material";
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function EditCategory({ category, handleEditCategorySubmit }) {
  const [editedName, setEditedName] = useState(category.name);
  const [openEditForm, setOpenEditForm] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit form dengan data:", { ...category, name: editedName });
    handleEditCategorySubmit({ ...category, name: editedName })
      .then(() => {
        dispatch(showSnackbar({ title: 'Success', message: 'Kategori berhasil diperbarui', type: 'success' }));
      })
      .catch((error) => {
        console.error("Kesalahan saat memperbarui kategori:", error);
        dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memperbarui kategori', type: 'error' }));
      });
    setOpenEditForm(false);
  };

  return (
    <Collapse in={openEditForm}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            label="Nama Kategori"
            value={editedName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="success" type="submit">Simpan Perubahan</Button>
        </FormGroup>
      </form>
    </Collapse>
  );
}
