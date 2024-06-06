import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Logo from '../../../assets/img/logo2.png';
import { Category, Dashboard, Inventory, ReceiptLong, Person, Discount } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import DashboardAdmin from '../../../components/AdminContent/Dashboard/Dashboard';
import Product from '../../../components/AdminContent/Product/Product';
import Order from '../../../components/AdminContent/Order/Order';
import User from '../../../components/AdminContent/User/User';
import CategoryAdmin from '../../../components/AdminContent/Category/CategoryAdmin';
import PaymentAdmin from '../../../components/AdminContent/Payment/PaymentAdmin';
import DeliveryAdmin from '../../../components/AdminContent/Delivery/DeliveryAdmin';
import HeaderAdmin from '../../../components/Header/HeaderAdmin';
import Voucher from '../../../components/AdminContent/Voucher/Voucher';
import './HomePageAdmin.css'; // Import file CSS terpisah

export default function HomePageAdmin() {
    const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
        const hash = window.location.hash.substr(1); // Ambil hash dari URL
        return hash || 'Dashboard'; // Jika hash ada, gunakan hash tersebut, jika tidak, kembalikan 'Dashboard'
    });
    const [title, setTitle] = useState('Dashboard');

    const sidebarItems = [
        { text: 'Dashboard', icon: Dashboard, title: 'Dashboard' },
        { text: 'Produk', icon: Inventory, title: 'Produk' },
        { text: 'Pesanan', icon: ReceiptLong, title: 'Pesanan' },
        { text: 'Kategori', icon: Category, title: 'Kategori' },
        { text: 'Pembayaran', icon: CreditCardIcon, title: 'Pembayaran' },
        { text: "Jasa Pengiriman", icon: LocalShippingIcon, title: "Jasa Pengiriman" },
        { text: 'Voucher', icon: Discount, title: 'Voucher' },
        { text: 'User', icon: Person, title: 'User' },
    ];

    useEffect(() => {
        // Fungsi untuk mengubah URL sesuai dengan konten yang dipilih
        const updateUrl = () => {
            const url = `/admin#${selectedMenuItem.replace(/\s+/g, '-')}`;
            window.history.replaceState(null, null, url);
        };

        // Panggil fungsi saat selectedMenuItem berubah
        updateUrl();
    }, [selectedMenuItem]);

    const handleSidebarClick = (text) => {
        setSelectedMenuItem(text);
        setTitle(text);
    };

    const renderDynamicContent = () => {
        switch (selectedMenuItem) {
            case 'Dashboard':
                return <DashboardAdmin />;
            case 'Produk':
                return <Product />;
            case 'Pesanan':
                return <Order />;
            case 'Kategori':
                return <CategoryAdmin />;
            case 'Pembayaran':
                return <PaymentAdmin />;
            case 'Jasa Pengiriman':
                return <DeliveryAdmin />;
            case 'User':
                return <User />;
            case 'Voucher':
                return <Voucher />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#fafafa' }}>
            <Box className="sidebar">
                <img src={Logo} alt="Logo" className="logo" />
                <List sx={{ paddingTop: 0 }}>
                    {sidebarItems.map((item) => (
                        <ListItem key={item.text} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ListItemButton
                                className={`sidebar-button ${selectedMenuItem === item.text ? 'active' : ''}`}
                                onClick={() => handleSidebarClick(item.text)}
                            >
                                <ListItemIcon className={`sidebar-icon ${selectedMenuItem === item.text ? 'active-icon' : ''}`} sx={{ color: 'white' }}>
                                    {React.createElement(item.icon)}
                                </ListItemIcon>
                                <ListItemText primary={<span className="sidebar-text">{item.text}</span>} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className="content">
                <Box className="header">
                    <HeaderAdmin title={title} />
                </Box>
                <Box className="dynamic-content">
                    {renderDynamicContent()}
                </Box>
            </Box>
        </Box>
    );
}
