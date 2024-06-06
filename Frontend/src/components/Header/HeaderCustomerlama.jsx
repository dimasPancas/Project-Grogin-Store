import { useEffect, useCallback } from 'react';
import { AppBar, Badge, Box, Button, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, AccountCircle } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/slices/cartSlice';
import logo from '../../assets/img/logo1.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const midLinks = [
  { title: 'Beranda', path: '/' },
  { title: 'Kategori', path: '/kategori' },
  { title: 'Promo', path: '/promo' },
  { title: 'Kontak', path: '/kontak' },
];

export default function HeaderCustomer() {
  const { isLoggedIn, username, handleLogout, authToken } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const fetchCartDataFromAPI = async () => {
    try {
      const response = await axios.get('https://localhost:7249/api/Cart', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  };

  const fetchCartData = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const cartData = await fetchCartDataFromAPI();
        dispatch(setCartItems(cartData));
      } catch (error) {
        console.error('Error fetching cart data:', error);
        // Tangani kesalahan jika fetch gagal
      }
    }
  }, [isLoggedIn, dispatch, authToken]);

  useEffect(() => {
    // Panggil fetchCartData ketika komponen pertama kali dirender
    fetchCartData();
  }, [fetchCartData]);

  return (
    <div style={{ backgroundColor: '#D9D9D9', marginBottom: 10 }}>
      <AppBar position="sticky" sx={{ zIndex: 1000, color: 'black', bgcolor: '#FAFAFA', borderRadius: 3 }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <NavLink to="/">
              <img src={logo} alt="Logo" style={{ marginRight: 3, width: '5rem' }} />
            </NavLink>
          </Box>

          {/* Middle Links */}
          <Box style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <List sx={{ color: '#634C9F', fontWeight: 'bold', fontFamily: 'Tahoma', display: 'flex' }}>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{
                    '&.active': {
                      color: 'black',
                    },
                    '&:hover': {
                      color: 'white',
                      bgcolor: '#634C9F',
                      border: 'white',
                      borderRadius: '10px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    },
                  }}
                >{title}</ListItem>
              ))}
            </List>
          </Box>

          {/* Right Side Icons and Logout Button */}
          <Box style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {isLoggedIn ? (
              <List style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <Box display="flex" alignItems="center">
                  <Badge color="error" style={{
                    marginRight: 10,
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Time',
                    fontWeight: 'bold'
                  }}>
                    <NavLink to="/profil" style={{ display: 'flex', textDecoration: 'none' }}>
                      <AccountCircle />
                      <Typography variant='subtitle2' style={{
                        fontFamily: 'Tahoma',
                        fontWeight: 'bold',
                        color: 'black'
                      }}>
                        Hi, {username.replace(/^\w/, (c) => c.toUpperCase())}!
                      </Typography></NavLink>
                  </Badge>
                </Box>
                <Badge
                  badgeContent={0}
                  color="error"
                  style={{
                    marginRight: 10,
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}>
                  <NavLink to="/wishlist">
                    <FavoriteBorder />
                  </NavLink>
                </Badge>
                <Badge badgeContent={totalItems} color="error" style={{ marginRight: 20 }}>
                  <NavLink to="/keranjang">
                    <ShoppingCart color='black' />
                  </NavLink>
                </Badge>
                <Button
                  onClick={handleLogout}
                  variant='outlined'
                  style={{
                    color: '#634C9F',
                    marginRight: 10,
                    borderColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                >Logout</Button>
              </List>
            ) : (
              <List>
                <Button
                  component={NavLink}
                  to="/login"
                  key="/login"
                  variant='outlined'
                  style={{
                    color: '#634C9F',
                    marginRight: 10,
                    borderColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                >Login</Button>
                <Button
                  component={NavLink}
                  to="/register"
                  key="/register"
                  variant='contained'
                  style={{
                    backgroundColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}>Register</Button>
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar >
    </div>
  );
}
