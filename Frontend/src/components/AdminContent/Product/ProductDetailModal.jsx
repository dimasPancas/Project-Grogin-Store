/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Divider } from '@mui/material';

export default function ProductDetailModal({ open, handleClose, product }) {
  if (!product) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        outline: 'none'
      }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#634C9F' }}>
          Detail Produk
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src={`https://localhost:7249/Resources/${product.productImage}`}
            alt={product.name}
            width="150"
            height="150"
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        <Typography sx={{ mt: 1, mb: 2, color: 'text.secondary', textAlign: 'justify' }}>
          {product.description}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Kategori:</Typography>
          <Typography>{product.category}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Stok:</Typography>
          <Typography>{product.stock}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Harga:</Typography>
          <Typography>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Tanggal Dibuat:</Typography>
          <Typography>{new Date(product.createdDate).toLocaleString('id-ID')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Tanggal Diperbarui:</Typography>
          <Typography>{new Date(product.updatedDate).toLocaleString('id-ID')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Dibuat oleh:</Typography>
          <Typography>{product.createdBy}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Diperbarui oleh:</Typography>
          <Typography>{product.updatedBy}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleClose}
            variant="contained"
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
            Tutup
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
