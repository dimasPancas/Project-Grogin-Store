/* eslint-disable react/prop-types */
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { CheckCircle, HourglassEmpty, LocalShipping, Done, Cancel } from '@mui/icons-material';

// Fungsi untuk mendapatkan string status pesanan berdasarkan kode status
export const getOrderStatusString = (status) => {
  switch (status) {
    case 1:
      return 'Menunggu Pembayaran';
    case 2:
      return 'Sedang Dikemas';
    case 3:
      return 'Sedang Dikirim';
    case 4:
      return 'Selesai';
    case 5:
      return 'Dibatalkan';
    default:
      return '';
  }
};

// Fungsi untuk mendapatkan ikon status berdasarkan kode status
const getStatusIcon = (status) => {
  switch (status) {
    case 1:
      return <HourglassEmpty sx={{ mr: 1, color: '#f57c00' }} />;
    case 2:
      return <CheckCircle sx={{ mr: 1, color: '#29b6f6' }} />;
    case 3:
      return <LocalShipping sx={{ mr: 1, color: '#ab47bc' }} />;
    case 4:
      return <Done sx={{ mr: 1, color: '#66bb6a' }} />;
    case 5:
      return <Cancel sx={{ mr: 1, color: '#ef5350' }} />;
    default:
      return null;
  }
};

function OrderStatusBreadcrumbs({ status }) {
  const steps = [
    { label: 'Menunggu Pembayaran', code: 1 },
    { label: 'Sedang Dikemas', code: 2 },
    { label: 'Sedang Dikirim', code: 3 },
    { label: 'Selesai', code: 4 },
    { label: 'Dibatalkan', code: 5 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {steps.map((step) => (
          <Link
            key={step.code}
            color={status >= step.code ? 'textPrimary' : 'textSecondary'}
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {getStatusIcon(step.code)}
            {status === step.code ? (
              <Typography variant="body1" fontWeight="bold">
                {step.label}
              </Typography>
            ) : (
              <Typography variant="body1">{step.label}</Typography>
            )}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default OrderStatusBreadcrumbs;
