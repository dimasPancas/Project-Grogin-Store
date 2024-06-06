/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button, Modal, Box, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/slices/snackbarSlice";
import { addAdminVoucher } from "../../../services/api/adminApi";
import { useAuth } from "../../../contexts/AuthContext";

const AddVoucher2 = ({ open, onClose, fetchVouchers }) => {
  const { authToken } = useAuth();
  const dispatch = useDispatch();  // Inisialisasi dispatch
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    type: "",
    discountValue: "",
    maxDiscountAmount: "",
    maxRedemptions: "",
    expiryDate: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Konversi tanggal kadaluarsa ke format ISO 8601
    const expiryDate = new Date(newVoucher.expiryDate).toISOString();

    const voucherData = {
      ...newVoucher,
      expiryDate: expiryDate,  // Set tanggal kadaluarsa ke format ISO 8601
    };

    try {
      await addAdminVoucher(voucherData, authToken);
      dispatch(showSnackbar({
        title: "Sukses",
        message: "Voucher berhasil ditambahkan!",
        type: "success"
      }));
      onClose();
      fetchVouchers();
    } catch (error) {
      console.error("Gagal menambahkan voucher:", error);
      dispatch(showSnackbar({
        title: "Error",
        message: "Gagal menambahkan voucher. Silakan coba lagi.",
        type: "error"
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          id="modal-modal-title"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}
        >
          Tambahkan Voucher
        </Typography>
        <Typography
          component="p"
          id="modal-modal-description"
          sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}
        >
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

export default AddVoucher2;
