/* eslint-disable react/prop-types */
import { Typography, Button, Modal, Box } from "@mui/material";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

export default function DeleteAccountModal({ isOpen, onClose }) {
  const { authToken, handleLogout } = useAuth();

  const handleDeleteAccount = () => {
    // Panggil API untuk menghapus akun
    axios.delete('https://localhost:7249/api/User', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(() => {
        // Jika penghapusan berhasil, logout pengguna
        handleLogout();
      })
      .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error('Error deleting account:', error);
        // Di sini Anda bisa menampilkan pesan kesalahan kepada pengguna
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-account-modal-title"
      aria-describedby="delete-account-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
      }}>
        <Typography id="delete-account-modal-title" variant="h6" gutterBottom>
          Hapus Akun
        </Typography>
        <Typography id="delete-account-modal-description" variant="body1" gutterBottom>
          Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.
        </Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Konfirmasi Penghapusan Akun
        </Button>
      </Box>
    </Modal>
  );
}
