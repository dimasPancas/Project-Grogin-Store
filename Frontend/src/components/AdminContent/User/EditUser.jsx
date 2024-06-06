import { useState } from "react";
import { Collapse, TextField, Button, FormGroup, Box } from "@mui/material";

export default function EditUser({ user, handleEditUserSubmit }) {
  const [editedUser, setEditedUser] = useState({
    email: user.email,
    userName: user.userName,
    phoneNumber: user.phoneNumber || "",
    profilePicture: null // File gambar profil
  });
  const [openEditForm, setOpenEditForm] = useState(false); // Initially closed

  // Fungsi untuk mengubah nilai state editedUser ketika user mengubah input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Kirimkan perubahan data pengguna ke fungsi handleEditUserSubmit
    handleEditUserSubmit(editedUser);
    setOpenEditForm(false); // Close the form after submission
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button variant="contained" onClick={() => setOpenEditForm(true)}>
        Edit User
      </Button>
      <Collapse in={openEditForm}>
        <FormGroup onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            value={editedUser.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="userName"
            label="Username"
            value={editedUser.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            value={editedUser.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Contoh input untuk gambar profil */}
          {/* <input
            type="file"
            accept="image/*"
            onChange={(event) => setEditedUser({ ...editedUser, profilePicture: event.target.files[0] })}
          /> */}
          <Button type="submit">Simpan Perubahan</Button>
        </FormGroup>
      </Collapse>
    </Box>
  );
}