import { Box, Button, Modal, Typography } from "@mui/material"

const DetailVoucher = ({ open, onClose, voucher }) => {
    if (!voucher) return null;

    const voucherTypeToString = (type) => {
        switch (type) {
            case 0:
                return 'Percentage';
            case 1:
                return 'Fixed';
            case 2:
                return 'FreeShipping';
            default:
                return 'Unknown';
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', margin: 'auto', width: '50%', top: '10%', position: 'relative' }}>
                <Typography variant="h6" gutterBottom>Voucher Details</Typography>
                <Typography variant="body1">Name: {voucher.name}</Typography>
                <Typography variant="body1">Type: {voucherTypeToString(voucher.type)}</Typography>
                <Typography variant="body1">Discount Value: {voucher.discountValue}</Typography>
                <Typography variant="body1">Max Discount Amount: {voucher.maxDiscountAmount}</Typography>
                <Typography variant="body1">Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}</Typography>
                <Typography variant="body1">Created At: {new Date(voucher.createdAt).toLocaleDateString()}</Typography>
                <Typography variant="body1">Current Redemptions: {voucher.currentRedemptions}</Typography>
                <Typography variant="body1">Max Redemptions: {voucher.maxRedemptions}</Typography>
                <Typography variant="body1">Is Active: {voucher.isActive ? 'Yes' : 'No'}</Typography>
                <Button variant="contained" onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
};


export default DetailVoucher;
