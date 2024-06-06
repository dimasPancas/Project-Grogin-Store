import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, ButtonGroup } from "@mui/material";
import { useAuth } from '../../../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddShoppingCart } from '@mui/icons-material';
import { AddToCart } from '../../../components/Button/AddToCart';
import { getWishlistItems, deleteWishlistItem } from '../../../services/api/customerApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function WishlistPage() {
  const { authToken } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      fetchWishlistItems(authToken);
    }
  }, [authToken]);

  const fetchWishlistItems = async (token) => {
    try {
      const items = await getWishlistItems(token);
      setWishlistItems(items);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal memuat wishlist', type: 'error' }));
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteWishlistItem(itemId, authToken);
      const updatedItems = wishlistItems.filter((item) => item.id !== itemId);
      setWishlistItems(updatedItems);
      dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil dihapus dari wishlist', type: 'success' }));
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal menghapus item dari wishlist', type: 'error' }));
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await AddToCart(productId, authToken);
      dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil ditambahkan ke keranjang', type: 'success' }));
    } catch (error) {
      console.error('Gagal menambahkan item ke keranjang:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal menambahkan item ke keranjang', type: 'error' }));
    }
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Produk</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Kategori</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Stok</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Harga</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlistItems.map((item) => (
              <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`https://localhost:7249/Resources/${item.productImage}`} alt={item.name} width="50" height="50" style={{ marginRight: '10px' }} />
                  {item.productName}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button
                      variant='contained'
                      onClick={() => handleAddToCart(item.productId)}
                    >
                      <AddShoppingCart />
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
