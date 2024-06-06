import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ReceiptLong, Person, PasswordRounded, ExitToApp, GppBad } from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import OrderHistoryPage from '../Order/OrderHistoryPage';
import ChangePassword from '../../../components/ProfileContent/ChangePassword';
import UserProfile from '../../../components/ProfileContent/UserProfile';
import DeleteAccountModal from '../../../components/ProfileContent/DeleteAccountModal';
import { ListItemIcon } from '@mui/material';
import LogoutModal from '../../../components/ProfileContent/LogoutModal'; // Import LogoutModal component
import UserVoucher from '../Vouchers/UserVoucher';

export default function UserProfilePage() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Profil');
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    const sidebarItems = [
        { text: 'Profil', icon: Person },
        { text: 'Vouchers Saya', icon: LocalOfferIcon },
        { text: 'Histori Transaksi', icon: ReceiptLong },
        { text: 'Ubah Password', icon: PasswordRounded },
        { text: 'Logout', icon: ExitToApp },
        { text: 'Hapus Akun', icon: GppBad },
    ];

    const handleSidebarClick = (text) => {
        if (text === 'Logout') {
            setLogoutModalOpen(true);
        } else if (text === 'Hapus Akun') {
            setDeleteAccountModalOpen(true);
        } else {
            setSelectedMenuItem(text);
        }
    };

    const renderDynamicContent = () => {
        switch (selectedMenuItem) {
            case 'Profil':
                return <UserProfile />;
            case 'Vouchers Saya':
                return <UserVoucher />;
            case 'Histori Transaksi':
                return <OrderHistoryPage />;
            case 'Ubah Password':
                return <ChangePassword />;
            default:
                return null;
        }
    };

    return (
        <Box height='auto' sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fafafa', borderRadius: 3, p: 1, mt: 2 }}>
            <Box sx={{ backgroundColor: '#634C9F', color: 'white', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
                <List sx={{ pt: 1 }}>
                    {sidebarItems.map((item) => (
                        <ListItem key={item.text} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ListItemButton
                                style={{
                                    backgroundColor: selectedMenuItem === item.text ? 'white' : '#634C9F',
                                    color: selectedMenuItem === item.text ? '#634C9F' : 'white',
                                    borderRadius: 10,
                                    width: '250px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1)'
                                }}
                                onClick={() => handleSidebarClick(item.text)}
                            >
                                <ListItemIcon sx={{ color: selectedMenuItem === item.text ? '#634C9F' : 'white' }}>
                                    {React.createElement(item.icon)}
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{item.text}</span>} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box width="100%" component="main" sx={{ p: 3, backgroundColor: '#fafafa' }}>
                {renderDynamicContent()}
            </Box>

            {/* Gunakan DeleteAccountModal */}
            <DeleteAccountModal
                isOpen={isDeleteAccountModalOpen}
                onClose={() => setDeleteAccountModalOpen(false)}
            />

            {/* Gunakan LogoutModal */}
            <LogoutModal
                open={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
            />
        </Box>
    );
}
