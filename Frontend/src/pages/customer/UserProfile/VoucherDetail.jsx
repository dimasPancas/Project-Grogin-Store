import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const VoucherDetail = ({ voucher }) => {
    if (!voucher) {
        return null;
    }

    const formatDiscountValue = () => {
        switch (voucher.type) {
            case 0: // Percentage
                return `${voucher.discountValue}%`;
            case 1: // Fixed
                return `Rp ${voucher.discountValue.toLocaleString('id-ID')}`;
            case 2: // FreeShipping
                return '-';
            default:
                return voucher.discountValue;
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {voucher.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {['Percentage', 'Fixed', 'FreeShipping'][voucher.type]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Discount Value: {formatDiscountValue()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Max Discount Amount: Rp {voucher.maxDiscountAmount.toLocaleString('id-ID')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {voucher.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default VoucherDetail;
