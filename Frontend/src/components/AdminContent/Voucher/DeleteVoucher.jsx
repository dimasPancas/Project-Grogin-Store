/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

// Komponen untuk menghapus voucher
const DeleteVoucher = ({ open, onClose, onDelete, voucherName, voucherId }) => {
  const { authToken } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7249/api/Voucher/admin/${voucherId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'accept': '*/*'
        }
      });
      if (response.status === 200) {
        onDelete();
      } else {
        console.error("Error saat menghapus voucher:", response);
      }
    } catch (error) {
      console.error("Error saat menghapus voucher:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Apakah Anda yakin ingin menghapus {voucherName}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>Batal</Button>
          <Button variant="contained" onClick={handleDelete} sx={{ bgcolor: '#f44336', color: 'white' }}>Hapus</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteVoucher;
