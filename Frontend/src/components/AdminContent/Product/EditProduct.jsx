/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Box, TextField, Typography, Select, MenuItem, CircularProgress, FormControl, InputLabel } from "@mui/material";
import { useCategories } from '../../../contexts/CategoryContext';
import { useAuth } from '../../../contexts/AuthContext';
import axios from "axios";

export default function EditProduct({
  isLoading,
  initialProductData,
  openEditModal,
  handleEditModalClose,
  onSubmit,
  hasProductData
}) {
  const { authToken } = useAuth();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    productImage: "",
    stock: 0,
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const { categories } = useCategories();

  useEffect(() => {
    if (initialProductData) {
      setProduct({
        id: initialProductData.id || "",
        name: initialProductData.name || "",
        description: initialProductData.description || "",
        price: initialProductData.price || 0,
        productImage: initialProductData.productImage || "",
        stock: initialProductData.stock || 0,
        categoryId: initialProductData.categoryId || "",
      });
    }
  }, [initialProductData]);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('Id', product.id || '');
    formData.append('Name', product.name);
    formData.append('Description', product.description);
    formData.append('Price', product.price);
    if (imageFile) {
      formData.append('ImageFile', imageFile);
    }
    formData.append('Stock', product.stock);
    formData.append('CategoryId', product.categoryId);

    try {
      const response = await axios.patch(`https://localhost:7249/api/Product/admin/${product.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const responseData = response.data;
      if (responseData && responseData.status === 200 && responseData.data) {
        onSubmit(responseData.data);
      } else {
        console.error("Format respons tidak valid:", responseData);
      }
    } catch (error) {
      console.error("Error mengedit produk:", error);
    }
  };

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
      open={openEditModal}
      onClose={handleEditModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : hasProductData ? (
          <>
            <Typography variant="h5" component="h2" id="modal-modal-title" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}>
              Edit Produk
            </Typography>
            <Typography component="p" id="modal-modal-description" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Perbarui informasi produk Anda di bawah ini.
            </Typography>
            <TextField
              label="Nama Produk"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Deskripsi"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Harga"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <input
              type="file"
              name="imageFile"
              onChange={handleImageChange}
              style={{ display: 'block', marginBottom: '16px' }}
            />
            <TextField
              label="Stok"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel id="kategori-label">Kategori</InputLabel>
              <Select
                labelId="kategori-label"
                id="kategori"
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
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
              Simpan Perubahan
            </Button>
          </>
        ) : (
          <Typography>Tidak ada data produk yang tersedia.</Typography>
        )}
      </Box>
    </Modal>
  );
}
