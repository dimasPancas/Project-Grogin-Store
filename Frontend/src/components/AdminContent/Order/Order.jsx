import { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tabs, Tab } from "@mui/material";
import { AllInclusive, Payment, Inventory2, LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch } from 'react-redux';
import { showSnackbar } from "../../../redux/slices/snackbarSlice";
import { getAdminOrders, updateOrderStatus } from "../../../services/api/adminApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { authToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialStatusFilter = query.get("status") || "Semua";
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

  const statusStringToValue = (statusString) => {
    switch (statusString) {
      case "Menunggu Pembayaran":
        return 1;
      case "Sedang Dikemas":
        return 2;
      case "Sedang Dikirim":
        return 3;
      case "Selesai":
        return 4;
      case "Dibatalkan":
        return 5;
      case "Semua":
      default:
        return null;
    }
  };

  const statusValueToString = (statusValue) => {
    switch (statusValue) {
      case 1:
        return "Menunggu Pembayaran";
      case 2:
        return "Sedang Dikemas";
      case 3:
        return "Sedang Dikirim";
      case 4:
        return "Selesai";
      case 5:
        return "Dibatalkan";
      default:
        return "Semua";
    }
  };

  const fetchOrders = async (statusString) => {
    try {
      const statusValue = statusStringToValue(statusString);
      const data = await getAdminOrders(statusValue, authToken);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      dispatch(showSnackbar({ title: "Error", message: "Gagal mengambil data pesanan", type: "error" }));
    }
  };

  const handleTabChange = async (event, newValue) => {
    setStatusFilter(newValue);

    // Update the URL with the new query parameter
    navigate({
      pathname: location.pathname, // tetap di /admin
      search: `?status=${newValue}`
    });

    await fetchOrders(newValue);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const success = await updateOrderStatus(orderId, newStatus, authToken);
      if (success) {
        fetchOrders(statusFilter);
        dispatch(showSnackbar({ title: "Sukses", message: "Status pesanan berhasil diperbarui.", type: "success" }));
      } else {
        dispatch(showSnackbar({ title: "Gagal", message: "Gagal memperbarui status pesanan.", type: "error" }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      dispatch(showSnackbar({ title: "Error", message: "Terjadi kesalahan saat memperbarui status pesanan.", type: "error" }));
    }
  };

  useEffect(() => {
    fetchOrders(initialStatusFilter);
  }, [authToken, initialStatusFilter]);

  return (
    <>
      <Tabs value={statusFilter} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 0.5 }}>
        <Tab icon={<AllInclusive />} label="Semua" value="Semua" />
        <Tab icon={<Payment />} label="Menunggu Pembayaran" value="Menunggu Pembayaran" />
        <Tab icon={<Inventory2 />} label="Sedang Dikemas" value="Sedang Dikemas" />
        <Tab icon={<LocalShipping />} label="Sedang Dikirim" value="Sedang Dikirim" />
        <Tab icon={<CheckCircle />} label="Selesai" value="Selesai" />
        <Tab icon={<Cancel />} label="Dibatalkan" value="Dibatalkan" />
      </Tabs>

      <Box component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#634C9F' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopLeftRadius: '7px' }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tanggal Order</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total Pembelian</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Jasa Pengiriman</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status Order</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopRightRadius: '7px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString('id-ID')}</TableCell>
                <TableCell>{order.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                <TableCell>{order.deliveryName}</TableCell>
                <TableCell>{statusValueToString(order.orderStatus)}</TableCell>
                <TableCell>
                  {order.orderStatus === 2 && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LocalShipping />}
                      onClick={() => handleStatusUpdate(order.id, 3)}
                    >
                      Kirim
                    </Button>
                  )}
                  {order.orderStatus === 3 && (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => handleStatusUpdate(order.id, 4)}
                    >
                      Selesai
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
