import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Tabs, Tab, ButtonGroup, Button } from '@mui/material';
import { Payment, LocalShipping, Inventory2, CheckCircle, Cancel, AllInclusive, Info } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';
import PaymentModal from '../../../components/Payment/PaymentModal';
import { getAllCustomerOrders } from '../../../services/api/customerApi';
import emptyOrder from '../../../assets/img/order-transparent.png'

export default function OrderHistoryPage() {
  const { authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authToken != null) {
      fetchOrders(statusFilter);
    }
  }, [authToken, statusFilter]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status') || 'Semua';
    setStatusFilter(status);
  }, [location.search]);

  const fetchOrders = async (status) => {
    try {
      const orders = await getAllCustomerOrders(authToken); // Call the service function
      const sortedOrders = orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
      if (status !== 'Semua') {
        const filtered = sortedOrders.filter(order => getOrderStatusString(order.orderStatus) === status);
        setFilteredOrders(filtered);
      } else {
        setFilteredOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getOrderStatusString = (status) => {
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

  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
    navigate(`?status=${newValue}`);
  };

  const handlePayment = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.patch(`https://localhost:7249/api/Order/order-status/${orderId}`, {
        orderId: orderId,
        orderStatus: 5
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Pesanan berhasil dibatalkan:', response.data);
      dispatch(showSnackbar({ message: 'Pesanan berhasil dibatalkan.', type: 'success' }));
      fetchOrders(statusFilter);
      navigate(`/histori-pesanan?status=${statusFilter}`, { replace: true });
    } catch (error) {
      console.error('Error pembatalan pesanan:', error);
      dispatch(showSnackbar({ message: 'Terjadi kesalahan saat membatalkan pesanan.', type: 'error' }));
    }
  };

  const handlePaymentModalClose = () => {
    setShowModal(false);
    setSelectedOrderId('');
    fetchOrders(statusFilter);
    navigate(`/histori-pesanan?status=${statusFilter}`, { replace: true });
  };

  const handlePaymentSuccess = (message) => {
    dispatch(showSnackbar({ message, type: 'success' }));
    handlePaymentModalClose();
  };

  const handlePaymentError = (message) => {
    dispatch(showSnackbar({ message, type: 'error' }));
    handlePaymentModalClose();
  };

  return (
    <Container sx={{ bgcolor: '#fafafa', p: 2, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        Riwayat Pesanan
      </Typography>
      <Tabs value={statusFilter} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 0.5 }}>
        <Tab icon={<AllInclusive />} label="Semua" value="Semua" />
        <Tab icon={<Payment />} label="Menunggu Pembayaran" value="Menunggu Pembayaran" />
        <Tab icon={<Inventory2 />} label="Sedang Dikemas" value="Sedang Dikemas" />
        <Tab icon={<LocalShipping />} label="Sedang Dikirim" value="Sedang Dikirim" />
        <Tab icon={<CheckCircle />} label="Selesai" value="Selesai" />
        <Tab icon={<Cancel />} label="Dibatalkan" value="Dibatalkan" />
      </Tabs>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Tanggal Pesanan</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Total Pembayaran</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Jasa Pengiriman</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Status Pesanan</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={emptyOrder} alt="Pesanan Kosong" style={{ width: 150, height: 150 }} />
                  </div>
                  <Typography>Tidak ada pesanan dengan status {statusFilter}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{new Date(order.orderDate).toLocaleString('id-ID')}</TableCell>
                  <TableCell>{order.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                  <TableCell>{order.deliveryName}</TableCell>
                  <TableCell>{getOrderStatusString(order.orderStatus)}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained">
                      <Button component={Link} to={`/histori-pesanan/${order.id}`} variant="contained" color="info"><Info />Detail</Button>
                      {order.orderStatus === 1 && (
                        <>
                          <Button color="success" onClick={() => handlePayment(order.id)}><Payment />Bayar</Button>
                        </>
                      )}
                      {order.orderStatus >= 1 && order.orderStatus <= 3 && (
                        <Button color="error" onClick={() => handleCancel(order.id)}><Cancel />Batal</Button>
                      )}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showModal && (
        <PaymentModal
          orderId={selectedOrderId}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}
    </Container>
  );
}
