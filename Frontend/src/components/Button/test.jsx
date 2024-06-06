/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { AppBar, Badge, Box, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { Menu, ShoppingCart, FavoriteBorder, AccountCircle } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';
import BadgeContext from '../../contexts/BadgeContext';
import logo from '../../assets/img/logo1.png';

const midLinks = [
  { title: 'Beranda', path: '/' },
  { title: 'Kategori', path: '/kategori' },
  { title: 'Promo', path: '/promo' },
  { title: 'Kontak', path: '/kontak' },
];

export default function HeaderCustomer() {
  const { isLoggedIn, username, handleLogout } = useContext(AuthContext);
  const { cartItemsCount } = useContext(BadgeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // Mengambil item keranjang atau melakukan tindakan lain yang diperlukan berdasarkan status autentikasi
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ backgroundColor: '#D9D9D9' }}>
      <AppBar position="sticky" sx={{ zIndex: 1000, color: 'black', bgcolor: '#FAFAFA', borderRadius: 3 }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo and Hamburger Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/">
              <img src={logo} alt="Logo" style={{ marginRight: 3, width: '5rem' }} />
            </NavLink>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Box>

          {/* Middle Links for Medium and Larger Screens */}
          <Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                >
                  {title}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Right Side Icons and Logout Button */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge color="error" sx={{ marginRight: 2 }}>
                  <NavLink to="/profil" style={{ display: 'flex', textDecoration: 'none', alignItems: 'center' }}>
                    <AccountCircle />
                    <Typography variant='subtitle2' sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', color: 'black', ml: 1 }}>
                      Hi, {username.replace(/^\w/, (c) => c.toUpperCase())}!
                    </Typography>
                  </NavLink>
                </Badge>
                <Badge badgeContent={0} color="error" sx={{ marginRight: 2 }}>
                  <NavLink to="/wishlist">
                    <FavoriteBorder />
                  </NavLink>
                </Badge>
                <Badge badgeContent={cartItemsCount} sx={{ marginRight: 2 }}>
                  <NavLink to="/keranjang">
                    <ShoppingCart color='black' />
                  </NavLink>
                </Badge>
                <Button
                  onClick={handleLogout}
                  variant='outlined'
                  sx={{
                    color: '#634C9F',
                    marginRight: 2,
                    borderColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  component={NavLink}
                  to="/login"
                  variant='outlined'
                  sx={{
                    color: '#634C9F',
                    marginRight: 2,
                    borderColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  variant='contained'
                  sx={{
                    backgroundColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {midLinks.map(({ title, path }) => (
              <ListItem button component={NavLink} to={path} key={path}>
                <Typography variant='subtitle1'>{title}</Typography>
              </ListItem>
            ))}
            {isLoggedIn ? (
              <>
                <ListItem>
                  <NavLink to="/profil" style={{ display: 'flex', textDecoration: 'none', alignItems: 'center' }}>
                    <AccountCircle />
                    <Typography variant='subtitle2' sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', color: 'black', ml: 1 }}>
                      Hi, {username.replace(/^\w/, (c) => c.toUpperCase())}!
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/wishlist" style={{ display: 'flex', textDecoration: 'none', alignItems: 'center' }}>
                    <FavoriteBorder />
                    <Typography variant='subtitle2' sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', color: 'black', ml: 1 }}>
                      Wishlist
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/keranjang" style={{ display: 'flex', textDecoration: 'none', alignItems: 'center' }}>
                    <ShoppingCart />
                    <Typography variant='subtitle2' sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', color: 'black', ml: 1 }}>
                      Keranjang
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={handleLogout}
                    variant='outlined'
                    sx={{
                      color: '#634C9F',
                      borderColor: '#634C9F',
                      borderRadius: 7,
                      textTransform: "none",
                      fontFamily: 'Tahoma',
                      fontWeight: 'bold'
                    }}
                    fullWidth
                  >
                    Logout
                  </Button>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    component={NavLink}
                    to="/login"
                    variant='outlined'
                    sx={{
                      color: '#634C9F',
                      borderColor: '#634C9F',
                      borderRadius: 7,
                      textTransform: "none",
                      fontFamily: 'Tahoma',
                      fontWeight: 'bold'
                    }}
                    fullWidth
                  >
                    Login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    component={NavLink}
                    to="/register"
                    variant='contained'
                    sx={{
                      backgroundColor: '#634C9F',
                      borderRadius: 7,
                      textTransform: "none",
                      fontFamily: 'Tahoma',
                      fontWeight: 'bold'
                    }}
                    fullWidth
                  >
                    Register
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
