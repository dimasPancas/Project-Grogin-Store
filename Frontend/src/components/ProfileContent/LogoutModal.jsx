/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

function LogoutModal({ open, onClose }) {
  const { handleLogout } = useAuth(); // Ambil fungsi handleLogout dari AuthContext

  const handleConfirmLogout = () => {
    handleLogout(); // Panggil fungsi handleLogout saat tombol "Ya" ditekan
    onClose(); // Tutup modal setelah logout berhasil
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Konfirmasi Logout
        </Typography>
        <Typography id="modal-description" sx={{ mb: 2 }}>
          Apakah Anda yakin ingin keluar dari akun Anda?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onClose} sx={{ mr: 1 }}>
            Batal
          </Button>
          <Button variant="contained" onClick={handleConfirmLogout} color="error">
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LogoutModal;
