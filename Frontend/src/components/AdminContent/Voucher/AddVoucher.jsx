/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, Box, TextField, Typography, Grid, CircularProgress, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import { addAdminVoucher } from "../../../services/api/adminApi";

const AddVoucher = ({ handleAddVoucherSubmit, open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    type: "", // Tipe voucher yang dapat dipilih oleh admin
    discountValue: 0,
    maxDiscountAmount: 0,
    maxRedemptions: 0,
    expiryDate: "",
  });

  // Meng-handle perubahan pada input field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVoucher({ ...newVoucher, [name]: value });
  };

  // Meng-handle submit form untuk menambahkan voucher baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await addAdminVoucher(newVoucher, authToken);
      if (response) {
        handleAddVoucherSubmit(response);
      } else {
        console.error("Gagal membuat voucher.");
      }
    } catch (error) {
      console.error("Kesalahan dalam membuat voucher:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Gaya modal untuk menambahkan voucher
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
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Typography variant="h5" component="h2" id="modal-modal-title" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}>
          Tambahkan Voucher
        </Typography>
        <Typography component="p" id="modal-modal-description" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Silakan isi informasi voucher Anda di bawah ini.
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nama Voucher"
                  name="name"
                  value={newVoucher.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="type-label">Tipe Voucher</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={newVoucher.type}
                    onChange={handleChange}
                    label="Tipe Voucher"
                  >
                    <MenuItem value={0}>Diskon ...% dengan batas maksimum ...ribu rupiah</MenuItem>
                    <MenuItem value={1}>Diskon ...ribu rupiah</MenuItem>
                    <MenuItem value={2}>Gratis ongkir</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nilai Diskon (%)"
                  type="number"
                  name="discountValue"
                  value={newVoucher.discountValue}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Maksimal Diskon (Rp)"
                  type="number"
                  name="maxDiscountAmount"
                  value={newVoucher.maxDiscountAmount}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Maksimal Klaim"
                  type="number"
                  name="maxRedemptions"
                  value={newVoucher.maxRedemptions}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tanggal Kadaluarsa"
                  type="date"
                  name="expiryDate"
                  value={newVoucher.expiryDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
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
                  Tambah Voucher
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AddVoucher;
