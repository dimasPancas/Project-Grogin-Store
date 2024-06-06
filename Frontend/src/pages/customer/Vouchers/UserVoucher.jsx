import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import VoucherDetail from '../UserProfile/VoucherDetail';

const UserVoucher = () => {
    const { authToken } = useAuth();

    const [vouchers, setVouchers] = useState({
        freeShipping: [],
        voucherPercentage: [],
        voucherDiscount: []
    });

    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('https://localhost:7249/api/Voucher', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (response.data.status === 200) {
                    setVouchers(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching vouchers:', error);
            }
        };

        fetchVouchers();
    }, [authToken]);

    const handleOpenModal = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7249/api/Voucher/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.data.status === 200) {
                setSelectedVoucher(response.data.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching voucher detail:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVoucher(null);
    };

    const formatDiscountValue = (type, value) => {
        switch (type) {
            case 0: // Percentage
                return `${value}%`;
            case 1: // Fixed
                return `Rp ${value.toLocaleString('id-ID')}`;
            case 2: // FreeShipping
                return '-';
            default:
                return value;
        }
    };

    const renderVouchers = (title, vouchers) => (
        <Grid item xs={12} md={4}>
            <Box mb={3}>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                {vouchers && vouchers.length > 0 ? (
                    vouchers.map(voucher => (
                        <Card key={voucher.id} variant="outlined" sx={{ marginBottom: 2, '&:hover': { boxShadow: 6 } }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {voucher.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {['Percentage', 'Fixed', 'FreeShipping'][voucher.type]}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discount Value: {formatDiscountValue(voucher.type, voucher.discountValue)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Max Discount Amount: Rp {voucher.maxDiscountAmount.toLocaleString('id-ID')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}
                                </Typography>
                                <Button variant="outlined" onClick={() => handleOpenModal(voucher.id)}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No vouchers available.
                    </Typography>
                )}
            </Box>
        </Grid>
    );

    return (
        <Container>
            <Typography variant="h4" component="div" gutterBottom>
                Your Vouchers
            </Typography>
            <Grid container spacing={4}>
                {renderVouchers('Voucher Gratis Ongkir', vouchers.freeShipping)}
                {renderVouchers('Voucher Diskon', vouchers.voucherPercentage)}
                {renderVouchers('Potongan Harga', vouchers.voucherDiscount)}
            </Grid>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Voucher Detail</DialogTitle>
                <DialogContent>
                    <VoucherDetail voucher={selectedVoucher} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserVoucher;