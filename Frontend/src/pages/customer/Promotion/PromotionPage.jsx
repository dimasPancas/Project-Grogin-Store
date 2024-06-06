import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Snackbar, List, ListItem, ListItemText } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

export default function PromotionPage() {
  const { authToken } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch available vouchers when the component mounts
    fetchAvailableVouchers();
  }, [authToken]);

  const fetchAvailableVouchers = async () => {
    try {
      const response = await axios.get('https://localhost:7249/api/Voucher/available', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        const data = response.data;
        setVouchers(data.data.voucherDiscount); // Assuming vouchers are stored under data.data.voucherDiscount
      } else {
        throw new Error('Failed to fetch vouchers');
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setSnackbarMessage('An error occurred while fetching vouchers.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClaimVoucher = async (voucherId) => {
    try {
      const response = await axios.post(`https://localhost:7249/api/Voucher/claim/${voucherId}`, null, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setSnackbarMessage('Voucher claimed successfully.');
        setSnackbarOpen(true);
      } else {
        throw new Error('Failed to claim voucher');
      }
    } catch (error) {
      console.error('Error claiming voucher:', error);
      setSnackbarMessage('An error occurred while claiming voucher.');
      setSnackbarOpen(true);
    } finally {
      fetchAvailableVouchers();
    }
  };

  return (
    <div>
      <Typography variant="h6">Promotion Page</Typography>
      {vouchers && vouchers.length > 0 ? (
        <List>
          {vouchers.map((voucher) => (
            <ListItem key={voucher.id}>
              <ListItemText primary={voucher.name} secondary={`Expiry Date: ${new Date(voucher.expiryDate).toLocaleDateString()}`} />
              <Button variant="contained" color="primary" onClick={() => handleClaimVoucher(voucher.id)}>
                Claim
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No vouchers available at the moment.</Typography>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            CLOSE
          </Button>
        }
      />
    </div>
  );
  
}
