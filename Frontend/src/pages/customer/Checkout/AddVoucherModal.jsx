import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function AddVoucherModal({ open, onClose, vouchers, onSelectVoucher }) {
    const handleSelect = (event) => {
        onSelectVoucher(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Pilih Voucher</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="voucher-label">Voucher</InputLabel>
                    <Select
                        labelId="voucher-label"
                        onChange={handleSelect}
                        fullWidth
                    >
                        <MenuItem value={null}>Batalkan Pilihan Voucher</MenuItem>
                        {vouchers.map((voucher) => (
                            <MenuItem key={voucher.id} value={voucher}>
                                {voucher.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Tutup</Button>
            </DialogActions>
        </Dialog>
    );
}
