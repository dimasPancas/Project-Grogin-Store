/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, ButtonGroup, Tabs, Tab } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { Search, AllInclusive, Payment, Inventory2, LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";
import HeaderAdmin from "../../Header/HeaderAdmin";

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
        // Mengurutkan pesanan berdasarkan tanggal order terbaru
        const sortedOrders = responseData.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
        setTotalItems(responseData.data.length); // Use length of data array
      } else {
        console.error("Invalid response format:", responseData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <Box component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#634C9F' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopLeftRadius: '7px' }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tanggal Order</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total Pembelian</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopRightRadius: '7px' }}>Status Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, 5).map((order) => (
              <TableRow key={order.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                <TableCell>{order.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                <TableCell>{getOrderStatusString(order.orderStatus)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
