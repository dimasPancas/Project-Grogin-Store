/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Modal, Box, Typography, Button, ButtonGroup } from "@mui/material";
import { deleteAdminVoucher } from "../../../services/api/adminApi";

export default function DeleteVoucher2({ open, onClose, voucher, authToken, fetchVouchers }) {
  const handleDelete = async () => {
    try {
      if (!voucher) {
        console.error("Voucher tidak ditemukan.");
        return;
      }
      const success = await deleteAdminVoucher(voucher.id, authToken);
      if (success) {
        onClose();
        fetchVouchers();
      } else {
        console.error("Gagal menghapus voucher.");
      }
    } catch (error) {
      console.error("Kesalahan dalam menghapus voucher:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          width: 400,
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Konfirmasi Hapus Voucher
        </Typography>
        {voucher ? (
          <>
            <Typography variant="body1" mb={2}>
              Apakah Anda yakin ingin menghapus voucher "{voucher.name}"?
            </Typography>
            <ButtonGroup>
              <Button variant="contained" onClick={onClose}>
                Batal
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Hapus
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <Typography variant="body1" mb={2}>
            Voucher tidak ditemukan.
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
