import { useState, useEffect, useCallback } from 'react';
import { AppBar, Badge, Box, Button, List, Toolbar, Typography, Menu, MenuItem, InputBase, IconButton } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, AccountCircle, Menu as MenuIcon, Search as SearchIcon, ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/slices/cartSlice';
import logo from '../../assets/img/logo1.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import SearchResult from '../SearchResult/SearchResult';
import CircularProgress from '@mui/material/CircularProgress';

const midLinks = [
  { title: 'Beranda', path: '/' },
  { title: 'Kategori', path: '/kategori' },
  { title: 'Promo', path: '/promo' },
  { title: 'Kontak', path: '/kontak' },
];

export default function HeaderCustomer() {
  // eslint-disable-next-line no-unused-vars
  const { isLoggedIn, username, handleLogout, authToken } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const reduxSearchValue = useSelector((state) => state.productFilters.search);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState(reduxSearchValue);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = async (event) => {
    const searchQuery = event.target.value;
    setSearchValue(searchQuery); // Update state lokal

    // Hapus timeout sebelumnya (jika ada)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Atur searching menjadi true saat timeout mulai berjalan
    setIsSearching(true);

    // Atur timeout baru
    const newTimeout = setTimeout(async () => {
      setIsSearching(false); // Setelah timeout selesai, set searching menjadi false
      if (searchQuery.length > 0) {
        try {
          const response = await axios.get(`https://localhost:7249/api/Product`, {
            params: {
              search: searchQuery,
              PageNumber: 1,
              PageSize: 1000
            }
          });
          setSearchResults(response.data.data.items); // Update SearchResult dengan hasil pencarian
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]); // Kosongkan hasil pencarian jika query kosong
      }
    }, 1500); // Waktu jeda dua detik

    setTypingTimeout(newTimeout);
  };

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
      <AppBar position="fixed" sx={{ zIndex: 1000, color: 'black', bgcolor: '#FAFAFA' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/">
              <img src={logo} alt="Logo" style={{ margin: '0 5px', width: '5rem', }} />
            </NavLink>
          </Box>

          {/* Hamburger Menu */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon fontSize='large' sx={{ color: '#634C9f', bgcolor: '#f1f1f1', borderRadius: 1 }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {midLinks.map(({ title, path }) => (
                <MenuItem
                  component={NavLink}
                  to={path}
                  key={path}
                  onClick={handleMenuClose}
                >
                  {title}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Search Field in Center */}
          <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{ position: 'relative', width: '80%' }}>
              <Box sx={{ position: 'absolute', top: '100%', right: 0, width: '100%', zIndex: 999 }}>
                <SearchResult searchResults={searchResults} /> {/* Panggil komponen SearchResult */}
              </Box>
              <Box sx={{ borderRadius: 2, backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <InputBase
                  sx={{
                    pr: 1,
                    color: 'inherit',
                    width: '100%',
                    height: 40,
                    '& input': {
                      paddingLeft: '10px', // Jarak antara kursor dan teks yang diketikkan
                    },
                    '& input::placeholder': {
                      paddingLeft: '0px', // Tidak ada jarak untuk placeholder
                    },
                  }}
                  placeholder="Cari produk…"
                  value={searchValue} // Gunakan state lokal
                  onChange={handleSearchChange}
                />
                {/* Tampilkan circular progress jika sedang melakukan pencarian */}
                {isSearching ? (
                  <CircularProgress color="inherit" size={24} sx={{ mr: 1 }} />
                ) : (
                  <SearchIcon sx={{ mr: 1, color: '#634C9F' }} />
                )}
              </Box>
            </Box>
          </Box>

          {/* Right Side Icons and Logout Button */}
          <Box style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {isLoggedIn ? (
              <List style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <NavLink to="/profil" style={{ display: 'flex', textDecoration: 'none', margin: 10 }}>
                  <AccountCircle />
                  <Typography variant='subtitle2' style={{
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                    Hi, {username.replace(/^\w/, (c) => c.toUpperCase())}!
                  </Typography>
                </NavLink>
                <NavLink to="/wishlist" style={{ display: 'flex', alignItems: 'center', }}>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                </NavLink>
                <NavLink to="/keranjang" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <IconButton sx={{ color: '#634C9F' }}>
                    <Badge badgeContent={totalItems} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </NavLink>
                <IconButton
                  onClick={handleLogout}
                  variant='outlined'
                ><ExitToApp color='error' /></IconButton>
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
                  }}
                >Register</Button>
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
