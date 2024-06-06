/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, List, ListItem, Typography, IconButton, Drawer, ListItemIcon, ListItemText } from "@mui/material";
import { Comment, Notifications, ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook

export default function HeaderAdmin({ title }) {
  const { handleLogout } = useAuth(); // Use the useAuth hook to access handleLogout function
  const [drawerOpen, setDrawerOpen] = useState(false);

  const rightLinks = [
    { icon: <Comment sx={{ color: '#634C9F' }} />, key: 'Komentar' },
    { icon: <Notifications sx={{ color: '#634C9F' }} />, key: 'Notifikasi' },
    { icon: <ExitToApp color='error' onClick={handleLogout} />, key: 'Logout' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {rightLinks.map((link) => (
          <ListItem button key={link.key}>
            <ListItemIcon>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.key} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 2,
      backgroundColor: '#fafafa',
      height: 5
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      <List sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {rightLinks.map((link) => (
          <ListItem key={link.key} sx={{ p: 0, m: 1, display: 'flex', justifyContent: 'center' }}>
            {link.icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
