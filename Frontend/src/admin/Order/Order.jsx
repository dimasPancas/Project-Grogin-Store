import { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, ButtonGroup, Tabs, Tab } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { Search, AllInclusive, Payment, Inventory2, LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";

export default function Order() {
  const apiOrdersUrl = "https://localhost:7249/api/Order/admin";
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Function to convert order status code to string
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

  useEffect(() => {
    handleGetAllOrdersClick();
  }, [apiOrdersUrl, pageNumber, pageSize, statusFilter]);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1); // Reset to first page when changing page size
  };

  const handlePageNumberChange = (event, value) => {
    setPageNumber(value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    setPageNumber(1); // Reset to first page when searching
    handleGetAllOrdersClick();
  };

  const handleGetAllOrdersClick = async () => {
    try {
      const response = await axios.get(apiOrdersUrl, {
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          search: searchText,
          status: statusFilter === "Semua" ? null : statusFilter
        },
      });
      const responseData = response.data;
      if (responseData && responseData.status === 200 && responseData.data) {
        setOrders(responseData.data); // Update orders with filtered data
        setTotalItems(responseData.data.length); // Use length of data array
      } else {
        console.error("Invalid response format:", responseData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
    setPageNumber(1);
    handleGetAllOrdersClick();
  };

  return (
    <>
      <HeaderAdmin title='Order'></HeaderAdmin>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Cari Order"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <TextField
          select
          label="Page Size"
          variant="outlined"
          value={pageSize}
          onChange={handlePageSizeChange}
          sx={{ mr: 2 }}
        >
          {[5, 10, 20, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={handleSearchSubmit}
          sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
        >
          <Search /> Cari
        </Button>
      </Box>

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
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopRightRadius: '7px' }}>Status Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f4f4f4' } }}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>Rp. {order.totalAmount.toLocaleString()}</TableCell>
                <TableCell>{order.deliveryName}</TableCell>
                <TableCell>{getOrderStatusString(order.orderStatus)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Stack spacing={2}>
          {totalItems / pageSize !== 0 && (
            <Pagination
              count={Math.ceil(totalItems / pageSize)}
              page={pageNumber}
              onChange={handlePageNumberChange}
              variant="outlined"
              shape="rounded"
              sx={{ '& .MuiPaginationItem-root': { borderRadius: '0px' } }}
            />
          )}
        </Stack>
      </Box>
    </>
  );
}
