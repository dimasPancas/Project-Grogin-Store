/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function EditVoucher({
  initialVoucherData,
  openEditModal,
  handleEditModalClose,
  onSubmit,
  hasVoucherData
}) {
  const [voucher, setVoucher] = useState({
    voucherId: "",
    name: "",
    type: 0,
    discountValue: 0,
    maxDiscountAmount: 0,
    maxRedemptions: 0,
    expiryDate: "",
  });

  useEffect(() => {
    if (initialVoucherData) {
      setVoucher({
        voucherId: initialVoucherData.voucherId || "",
        name: initialVoucherData.name || "",
        type: initialVoucherData.type || 0,
        discountValue: initialVoucherData.discountValue || 0,
        maxDiscountAmount: initialVoucherData.maxDiscountAmount || 0,
        maxRedemptions: initialVoucherData.maxRedemptions || 0,
        expiryDate: initialVoucherData.expiryDate || "",
      });
    }
  }, [initialVoucherData]);

  const handleChange = (event) => {
    setVoucher({ ...voucher, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`https://localhost:7249/api/Voucher/admin/${voucher.voucherId}`, voucher, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data;
      if (responseData && responseData.Code === 200) {
        onSubmit(responseData.Details);
      } else {
        console.error("Server response not valid:", responseData);
      }
    } catch (error) {
      console.error("Error updating voucher:", error);
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
        {hasVoucherData ? (
          <>
            <Typography variant="h5" component="h2" id="modal-modal-title" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}>
              Edit Voucher
            </Typography>
            <Typography component="p" id="modal-modal-description" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Perbarui data voucher Anda di bawah.
            </Typography>
            <TextField
              label="Voucher Name"
              name="name"
              value={voucher.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount Value"
              type="number"
              name="discountValue"
              value={voucher.discountValue}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Max Discount Amount"
              type="number"
              name="maxDiscountAmount"
              value={voucher.maxDiscountAmount}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Max Redemptions"
              type="number"
              name="maxRedemptions"
              value={voucher.maxRedemptions}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Expiry Date"
              type="datetime-local"
              name="expiryDate"
              value={voucher.expiryDate}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
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
