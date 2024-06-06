/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/slices/snackbarSlice";
import { editAdminVoucher } from "../../../services/api/adminApi";

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: 400,
  borderRadius: 2,
};

export default function EditVoucher2({ open, onClose, initialData, authToken, fetchVouchers }) {
  const [editedVoucher, setEditedVoucher] = useState(initialData || {});
  const [hasVoucherData, setHasVoucherData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Initial data:", initialData);
    setEditedVoucher(initialData || {});
    setHasVoucherData(!!initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVoucher({ ...editedVoucher, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Ensure voucherId is included in the request
      const requestBody = {
        voucherId: editedVoucher.id,
        name: editedVoucher.name,
        type: editedVoucher.type,
        discountValue: editedVoucher.discountValue,
        maxDiscountAmount: editedVoucher.maxDiscountAmount,
        maxRedemptions: editedVoucher.maxRedemptions,
        expiryDate: new Date(editedVoucher.expiryDate).toISOString(),
      };

      const response = await editAdminVoucher(requestBody, authToken);
      if (response) {
        dispatch(showSnackbar({
          title: "Sukses",
          message: "Voucher berhasil diperbarui!",
          type: "success"
        }));
        onClose();
        fetchVouchers();
      } else {
        console.error("Gagal memperbarui voucher.");
        dispatch(showSnackbar({
          title: "Error",
          message: "Gagal memperbarui voucher. Silakan coba lagi.",
          type: "error"
        }));
      }
    } catch (error) {
      console.error("Error updating voucher:", error);
      dispatch(showSnackbar({
        title: "Error",
        message: "Terjadi kesalahan saat memperbarui voucher.",
        type: "error"
      }));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        {hasVoucherData ? (
          <>
            <Typography
              variant="h5"
              component="h2"
              id="modal-modal-title"
              sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}
            >
              Edit Voucher
            </Typography>
            <Typography
              component="p"
              id="modal-modal-description"
              sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}
            >
              Perbarui data voucher Anda di bawah.
            </Typography>
            <TextField
              label="Nama Voucher"
              name="name"
              value={editedVoucher.name || ""}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel id="type-label">Tipe Voucher</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={editedVoucher.type}
                onChange={handleChange}
                label="Tipe Voucher"
              >
                <MenuItem value={0}>Diskon ...% dengan batas maksimum ...ribu rupiah</MenuItem>
                <MenuItem value={1}>Diskon ...ribu rupiah</MenuItem>
                <MenuItem value={2}>Gratis ongkir</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nilai Diskon (%)"
              type="number"
              name="discountValue"
              value={editedVoucher.discountValue || ""}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Maksimal Diskon (Rp)"
              type="number"
              name="maxDiscountAmount"
              value={editedVoucher.maxDiscountAmount || ""}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Maksimal Klaim"
              type="number"
              name="maxRedemptions"
              value={editedVoucher.maxRedemptions || ""}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tanggal Kadaluarsa"
              type="datetime-local"
              name="expiryDate"
              value={editedVoucher.expiryDate ? editedVoucher.expiryDate.split(".")[0] : ""}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
          <Typography>Tidak ada data voucher yang tersedia.</Typography>
        )}
      </Box>
    </Modal>
  );
}
