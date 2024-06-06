/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { AddToCart } from './AddToCart';
import { addToWishlist } from './AddToWishlist';

export default function DropdownButton({ productId, stock }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, authToken } = useAuth();
  const dispatch = useDispatch();

  // Tangani klik pada tombol dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Tutup menu dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Tambahkan item ke keranjang
  const handleAddToCart = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect ke halaman login jika pengguna belum login
        console.log('Pengguna belum login. Mengarahkan ke halaman login...');
        navigate('/login');
        handleClose();
        return;
      }

      // Eksekusi fungsi addToCart untuk menambahkan item ke keranjang
      await AddToCart(productId, authToken);
      dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil ditambahkan ke keranjang', type: 'success' }));
      handleClose();
    } catch (error) {
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal menambahkan item ke keranjang', type: 'error' }));
      handleClose();
    }
  };

  // Tambahkan item ke wishlist
  const handleAddToWishlist = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect ke halaman login jika pengguna belum login
        console.log('Pengguna belum login. Mengarahkan ke halaman login...');
        navigate('/login');
        handleClose();
        return;
      }

      // Eksekusi fungsi addToWishlist untuk menambahkan item ke wishlist
      const result = await addToWishlist(productId, authToken);
      if (result.success) {
        dispatch(showSnackbar({ title: 'Success', message: result.message, type: 'success' }));
      } else {
        dispatch(showSnackbar({ title: 'Info', message: result.message, type: 'info' }));
      }
      handleClose();
    } catch (error) {
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal menambahkan item ke wishlist', type: 'error' }));
      handleClose();
    }
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: '#634C9F' }}
      >
        <AddCircleIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddToCart} disabled={stock === 0}>
          <ShoppingCartIcon color='black' />
          Tambah ke Keranjang
        </MenuItem>
        <MenuItem onClick={handleAddToWishlist} disabled={stock === 0}>
          <FavoriteIcon color='error' />
          Tambah ke Wishlist
        </MenuItem>
      </Menu>
    </div>
  );
}
