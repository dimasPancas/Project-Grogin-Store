/* eslint-disable react/prop-types */
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAuth } from "../../../contexts/AuthContext";
import { calculateItemSubtotal, calculateTotalAmount } from "../../../utils/orderCartCalculation";

export default function CheckoutSummary({ deliveryCost, paymentCost, freeShippingVoucher, discountVoucher }) {
  const { authToken } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Mengambil item keranjang dari API menggunakan authToken
    if (authToken) {
      fetchCartItems(authToken);
    }
  }, [authToken]);

  const fetchCartItems = async (token) => {
    try {
      const response = await fetch('https://localhost:7249/api/Cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Gagal mengambil item keranjang');
      }
      const data = await response.json();
      setCartItems(data.data);
    } catch (error) {
      console.error('Error mengambil item keranjang:', error);
    }
  };

  // Menghitung total yang harus dibayar
  const { total, totalBeforeDiscount, discountAmount } = calculateTotalAmount(cartItems, deliveryCost, paymentCost, freeShippingVoucher, discountVoucher);

  return (
    <>
      <Typography variant="h5" gutterBottom>Tinjau Pesanan Anda</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#634C9F' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Produk</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Jumlah</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Harga</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`https://localhost:7249/Resources/${item.productImage}`} alt={item.name} width="50" height="50" style={{ marginRight: '10px' }} />
                  {item.productName}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                <TableCell align="right">{calculateItemSubtotal(item).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">Biaya Pengiriman:</TableCell>
              <TableCell align="right">
                {freeShippingVoucher && deliveryCost ? (
                  <>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                      {parseFloat(deliveryCost).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      Rp 0,00
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">
                    {(deliveryCost || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">Biaya Layanan:</TableCell>
              <TableCell align="right">{(paymentCost || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
            </TableRow>
            {discountAmount > 0 && (
              <TableRow>
                <TableCell colSpan={3} align="right">Diskon:</TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'error.main' }}>
                    -{discountAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {discountAmount > 0 ? (
                  <>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                      {totalBeforeDiscount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                    {total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </>
                ) : (
                  total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
