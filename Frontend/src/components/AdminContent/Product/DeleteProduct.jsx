/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteProduct = ({ open, onClose, onDelete, productName }) => {
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
          Apakah anda yakin ingin menghapus produk {productName}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={onDelete} sx={{ bgcolor: '#f44336', color: 'white' }}>Delete</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProduct;
