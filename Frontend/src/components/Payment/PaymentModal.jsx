import { useState } from 'react';
import { Typography, Modal, TextField, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function PaymentModal({ orderId, onPaymentSuccess, onPaymentError }) {
  const [openModal, setOpenModal] = useState(true);
  const [enteredNumber, setEnteredNumber] = useState('');

  const handleCloseModal = () => {
    setOpenModal(false);
    setEnteredNumber('');
  };

  const handleInputChange = (event) => {
    // Filter hanya angka dan batasi panjang input ke 16 digit
    const input = event.target.value.replace(/\D/g, '').slice(0, 16);
    setEnteredNumber(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://localhost:7249/api/Order/${orderId}`, {
        paymentCode: enteredNumber
      }, {
        headers: {
          Authorization: `Bearer 'token_here'`
        }
      });
      onPaymentSuccess('Kode pembayaran berhasil dikirim. Pesanan Anda akan segera dikemas.');
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim kode pembayaran:', error);
      onPaymentError('Terjadi kesalahan saat mengirim kode pembayaran. Silakan coba lagi.');
    }
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
          <Typography variant="h6" id="modal-modal-title">Masukkan Kode Pembayaran</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Kode Pembayaran"
              variant="outlined"
              value={enteredNumber}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ maxLength: 16 }} // Batasi panjang input ke 16 karakter
              sx={{ mt: '10px' }}
            />
            <ButtonGroup sx={{ mt: '10px' }}>
              <Button type="submit" variant="contained" color="success">Konfirmasi</Button>
              <Button variant="contained" color="error" onClick={handleCloseModal}>Batal</Button>
            </ButtonGroup>
          </form>
        </div>
      </Modal>
    </div>
  );
}
