/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from "react";
import { getAvailableVouchers, claimVoucher } from "../../services/api/customerApi";
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';

const AddVoucherModal = ({ open, onClose, onSelectVoucher }) => {
  const [availableVouchers, setAvailableVouchers] = useState({ freeShipping: [], combinedVouchers: [] });
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchAvailableVouchers = async () => {
      try {
        const vouchers = await getAvailableVouchers(authToken);
        setAvailableVouchers(vouchers);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil voucher yang tersedia:", error);
      }
    };

    if (open) {
      fetchAvailableVouchers();
    }
  }, [open, authToken]);

  // Fungsi untuk mengklaim voucher
  const handleClaimVoucher = async (voucherId) => {
    try {
      // Panggil fungsi claimVoucher
      await claimVoucher(voucherId, authToken);
      // Panggil fungsi onSelectVoucher untuk menandai voucher yang diklaim
      onSelectVoucher(voucherId);
      // Tutup modal setelah mengklaim voucher
      onClose();
    } catch (error) {
      console.error("Terjadi kesalahan saat mengklaim voucher:", error);
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          borderRadius: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Tambahkan Voucher
          </Typography>
          <Typography variant="body1" gutterBottom>
            Pilih voucher yang ingin Anda klaim:
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama Voucher</TableCell>
                  <TableCell>Tipe Voucher</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Daftar voucher gratis ongkir */}
                {availableVouchers.freeShipping && availableVouchers.freeShipping.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.name}</TableCell>
                    <TableCell>Masa Berlaku</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleClaimVoucher(voucher.id)}>Klaim Voucher</Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Daftar voucher persentase dan diskon */}
                {availableVouchers.combinedVouchers && availableVouchers.combinedVouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.name}</TableCell>
                    <TableCell>{formatDate(voucher.expiryDate)}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleClaimVoucher(voucher.id)}>Klaim Voucher</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ mt: 2 }}>
          {/* Tombol untuk menutup modal */}
          <Button variant="contained" onClick={onClose}>Tutup</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddVoucherModal;
