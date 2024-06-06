/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, Box, TextField, Typography, MenuItem, Grid, FormControl, InputLabel, Select, CircularProgress } from "@mui/material";
import axios from "axios";

// Hook custom untuk mengambil data kategori dari API
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data kategori dari API saat komponen dimuat
    axios.get("https://localhost:7249/api/Category")
      .then(response => {
        setCategories(response.data.data);
        setLoading(false); // Menghentikan loading saat data berhasil diambil
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoading(false); // Menghentikan loading saat terjadi kesalahan
      });
  }, []);

  return { categories, loading };
};

// Komponen untuk menambahkan produk baru
const AddProduct = ({ handleAddProductSubmit, openAddModal, handleAddModalClose }) => {
  const { categories, loading } = useCategories();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    productImage: "",
    stock: 0,
    categoryId: "",
    imageFile: null,
  });

  // Meng-handle perubahan pada input field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Meng-handle perubahan pada input file
  const handleFileChange = (event) => {
    setNewProduct({ ...newProduct, imageFile: event.target.files[0] });
  };

  // Meng-handle submit form untuk menambahkan produk baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', newProduct.name);
    formData.append('Description', newProduct.description);
    formData.append('Price', newProduct.price);
    formData.append('ImageFile', newProduct.imageFile);
    formData.append('Stock', newProduct.stock);
    formData.append('CategoryId', newProduct.categoryId);

    // Mengirim data produk baru ke fungsi handleAddProductSubmit
    handleAddProductSubmit(formData);
  };

  // Gaya modal untuk menambahkan produk
  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: 3,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    outline: 'none',
  };

  return (
    <Modal
      open={openAddModal}
      onClose={handleAddModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Typography variant="h5" component="h2" id="modal-modal-title" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}>
          Tambahkan Produk
        </Typography>
        <Typography component="p" id="modal-modal-description" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Silakan isi informasi produk Anda di bawah ini.
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nama Produk"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Harga"
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Deskripsi"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Gambar Produk"
                  type="file"
                  name="imageFile"
                  onChange={handleFileChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Stok"
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="kategori-label">Kategori</InputLabel>
                  <Select
                    labelId="kategori-label"
                    id="kategori"
                    name="categoryId"
                    value={newProduct.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="" disabled>
                      Pilih Kategori
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#634C9F",
                    color: "white",
                    fontWeight: 'bold',
                    borderRadius: 2,
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                    transition: 'background-color 0.3s, transform 0.2s',
                    '&:hover': {
                      bgcolor: '#523A92',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Tambah Produk
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AddProduct;
