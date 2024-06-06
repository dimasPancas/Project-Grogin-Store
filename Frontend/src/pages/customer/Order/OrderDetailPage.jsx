/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardMedia, Grid, Container } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import OrderReviewCollapse from './OrderReviewCollapse';
import { getOrderDetails } from '../../../services/api/customerApi';
import OrderStatusBreadcrumbs, { getOrderStatusString } from './OrderStatusBreadcrumbs'; // Import komponen breadcrumbs

export default function OrderDetailPage() {
  const { authToken } = useAuth();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // Ambil detail pesanan dari API saat komponen dipasang atau ID/authToken berubah
  useEffect(() => {
    getOrderDetails(id, authToken, setOrder);
  }, [id, authToken]);

  // Jika pesanan masih dimuat, tampilkan pesan memuat
  if (!order) {
    return (
      <Container sx={{ p: 2, borderRadius: 3, bgcolor: '#f5f5f5', mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Memuat pesanan...
        </Typography>
      </Container>
    );
  }

  // Render detail pesanan setelah dimuat
  return (
    <Container sx={{ p: 2, borderRadius: 3, bgcolor: '#f5f5f5', mt: 2 }}>
      <Grid item xs={12} sm={5}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Detail Pesanan
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2, bgcolor: '#fff', boxShadow: 2 }}>
          <Table sx={{ minWidth: 300 }}>
            <TableBody>
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                  Status Pesanan
                </TableCell>
                <TableCell>
                  {getOrderStatusString(order.orderStatus)}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                  Tanggal Pemesanan
                </TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                  Jasa Pengiriman
                </TableCell>
                <TableCell>
                  {order.deliveryName}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                  Metode Pembayaran
                </TableCell>
                <TableCell>
                  {order.paymentMethod}
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                  Alamat Pengiriman
                </TableCell>
                <TableCell>
                  {`${order.street.toUpperCase()}, ${order.village.toUpperCase()}, ${order.city.toUpperCase()}, ${order.province.toUpperCase()}, ${order.postalCode}`}
                </TableCell>
              </TableRow>
              {order.vouchersUsed && order.vouchersUsed.map((voucher) => (
                <TableRow key={voucher.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#37474f' }}>
                    Voucher Digunakan
                  </TableCell>
                  <TableCell>
                    {voucher.name} (
                    {voucher.type === 0 ?
                      `Diskon ${voucher.discountPercentage}% Maks: ${voucher.maxDiscountAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}` :
                      voucher.type === 1 ?
                        `Diskon: ${voucher.maxDiscountAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}` :
                        'Gratis Ongkir'
                    }
                    )
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="h5" sx={{ my: 2 }}>
          Produk Dipesan
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead sx={{ backgroundColor: '#634C9F' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Produk</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Kategori</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Harga</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Jumlah</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold', color: 'white' }}>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.productsDetailsOrder && order.productsDetailsOrder.map((product) => (
                <React.Fragment key={product.orderDetailId}>
                  <TableRow hover>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        alt={product.productName}
                        image={`https://localhost:7249/Resources/${product.productImage}`}
                        title={product.productName}
                        onClick={() => {
                          window.location.href = `https://localhost:5173/detail-produk/${product.productId}`;
                        }}
                        sx={{ width: 50, height: 50, borderRadius: 1, mr: 2, cursor: 'pointer' }}
                      />
                      {product.productName}
                    </TableCell>
                    <TableCell>{product.productCategory}</TableCell>
                    <TableCell>{product.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell align='right'>{product.subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                  </TableRow>
                  {product.comment ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <OrderReviewCollapse existingReview={product.comment} />
                      </TableCell>
                    </TableRow>
                  ) : (
                    order.orderStatus === 4 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <OrderReviewCollapse productId={product.productId} productName={product.productName} orderDetailId={product.orderDetailId} />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </React.Fragment>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} align='right'>Biaya Pengiriman:</TableCell>
                <TableCell align='right'>
                  {order.vouchersUsed.some(voucher => voucher.type === 2) ? (
                    <>
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                        {order.deliveryPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'success.main' }}>
                        Rp 0,00
                      </Typography>
                    </>
                  ) : (
                    order.deliveryPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} align='right'>Biaya Pemesanan:</TableCell>
                <TableCell align='right' >{order.paymentCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              </TableRow>
              {order.vouchersUsed.some(voucher => voucher.type === 1) && (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell colSpan={3} align='right'>Diskon:</TableCell>
                  <TableCell align='right'>
                    <Typography variant="body2" sx={{ color: 'error.main' }}>
                      -{Math.min(order.vouchersUsed.find(voucher => voucher.type === 1).maxDiscountAmount, order.totalAmount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} align='right' sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total:</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {order.vouchersUsed.some(voucher => voucher.type === 1) ? (
                    <>
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                        {order.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </Typography>
                      {(order.totalAmount - Math.min(order.vouchersUsed.find(voucher => voucher.type === 1).maxDiscountAmount, order.totalAmount)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </>
                  ) : (
                    order.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
}
