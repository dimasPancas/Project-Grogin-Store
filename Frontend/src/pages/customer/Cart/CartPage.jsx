/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button } from "@mui/material";
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../../../redux/slices/cartSlice';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function CartPage() {
  const { authToken } = useAuth();
  const [cartItems, setCartItemsLocal] = useState([]);
  const [temporaryQuantities, setTemporaryQuantities] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      fetchCartItems(authToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const fetchCartItems = async (token) => {
    try {
      const response = await axios.get('https://localhost:7249/api/Cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItemsLocal(response.data.data);
      dispatch(setCartItems(response.data.data));
      const initialQuantities = {};
      response.data.data.forEach(item => {
        initialQuantities[item.id] = item.quantity;
      });
      setTemporaryQuantities(initialQuantities);
    } catch (error) {
      console.error('Error mengambil item keranjang:', error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setTemporaryQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));
  };

  const saveChanges = async (itemId) => {
    try {
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        if (temporaryQuantities[itemId] === 0) {
          await axios.delete(`https://localhost:7249/api/Cart/${itemId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          const updatedItems = cartItems.filter(item => item.id !== itemId);
          setCartItemsLocal(updatedItems);
          dispatch(setCartItems(updatedItems));
          dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil dihapus dari keranjang', type: 'success' }));
        } else if (temporaryQuantities[itemId] !== item.quantity) {
          await axios.put(`https://localhost:7249/api/Cart/${item.id}`, {
            id: item.id,
            quantity: temporaryQuantities[item.id]
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          });
          console.log('Jumlah item berhasil diperbarui.');
          fetchCartItems(authToken); // Refresh data keranjang setelah update
          dispatch(showSnackbar({ title: 'Success', message: 'Jumlah item berhasil diperbarui.', type: 'success' }));
        }
        setEditItemId(null); // Tutup collapse setelah perubahan disimpan
      }
    } catch (error) {
      console.error('Gagal memperbarui item:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal memperbarui item.', type: 'error' }));
    }
  };

  const handleDeleteItemClick = async (index, itemId) => {
    try {
      await axios.delete(`https://localhost:7249/api/Cart/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      const updatedItems = cartItems.filter((_, i) => i !== index);
      setCartItemsLocal(updatedItems);
      dispatch(setCartItems(updatedItems));
      dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil dihapus dari keranjang', type: 'success' }));
    } catch (error) {
      console.error('Error menghapus item keranjang:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal menghapus item', type: 'error' }));
    }
  };

  const ccyFormat = (num) => {
    return `${num}`;
  };

  const invoiceTotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  const handleEditClick = (itemId) => {
    setEditItemId(prevItemId => (prevItemId === itemId ? null : itemId));
  };

  return (
    <Container sx={{ mt: 0 }}>
      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Keranjang belanja Anda kosong.
        </Typography>
      ) : (
        <>
          {/* <Typography variant='h6' m={1}>Keranjang Anda</Typography> */}
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Produk</TableCell>
                  <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Jumlah</TableCell>
                  <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Harga</TableCell>
                  <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Subtotal</TableCell>
                  <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    temporaryQuantities={temporaryQuantities}
                    handleQuantityChange={handleQuantityChange}
                    handleEditClick={handleEditClick}
                    handleDeleteItemClick={handleDeleteItemClick}
                    isEditing={editItemId === item.id}
                    saveChanges={saveChanges}
                  />
                ))}
                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell rowSpan={2} />
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={1} sx={{ fontweight: 'bold' }}>Total:</TableCell>
                  <TableCell align='right'>{ccyFormat(invoiceTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ bgcolor: '#634C9F', fontWeight: 'bold' }}
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
