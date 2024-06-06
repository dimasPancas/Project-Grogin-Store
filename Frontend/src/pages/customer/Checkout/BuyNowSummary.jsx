/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import { calculateTotalAmount, calculateItemSubtotal } from "../../../utils/buyNowCalculation";
import { getProductById } from '../../../services/api/customerApi';

export default function BuyNowSummary({ productId, quantity, deliveryCost, paymentCost, freeShippingVoucher, discountVoucher }) {
  const { authToken } = useAuth();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authToken && productId) {
          const product = await getProductById(productId, authToken);
          setProductData(product);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [authToken, productId]);

  if (!productData) {
    return <Typography variant="body1">Memuat data produk...</Typography>;
  }

  const subtotal = calculateItemSubtotal({ productPrice: productData.price, quantity });
  const parsedDeliveryCost = isNaN(parseFloat(deliveryCost)) ? 0 : parseFloat(deliveryCost);
  const parsedPaymentCost = isNaN(parseFloat(paymentCost)) ? 0 : parseFloat(paymentCost);

  // Log untuk memastikan nilai yang dihasilkan benar
  console.log('Product Data:', productData);
  console.log('Quantity:', quantity);
  console.log('Subtotal:', subtotal);
  console.log('Parsed Delivery Cost:', parsedDeliveryCost);
  console.log('Parsed Payment Cost:', parsedPaymentCost);
  console.log('Free Shipping Voucher:', freeShippingVoucher);
  console.log('Discount Voucher:', discountVoucher);

  const { total, totalBeforeDiscount, discountAmount } = calculateTotalAmount(
    [{ ...productData, quantity }],
    parsedDeliveryCost,
    parsedPaymentCost,
    freeShippingVoucher,
    discountVoucher
  );

  console.log('Total:', total);
  console.log('Total Before Discount:', totalBeforeDiscount);
  console.log('Discount Amount:', discountAmount);

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
            <TableRow key={productData.id}>
              <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={`https://localhost:7249/Resources/${productData.productImage}`} alt={productData.name} width="50" height="50" style={{ marginRight: '10px' }} />
                {productData.name}
              </TableCell>
              <TableCell align="right">{quantity}</TableCell>
              <TableCell align="right">{productData.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
              <TableCell align="right">{subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">Biaya Pengiriman:</TableCell>
              <TableCell align="right">
                {freeShippingVoucher && parsedDeliveryCost ? (
                  <>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                      {parsedDeliveryCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      Rp 0,00
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">
                    {parsedDeliveryCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="right">Biaya Layanan:</TableCell>
              <TableCell align="right">{parsedPaymentCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
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
