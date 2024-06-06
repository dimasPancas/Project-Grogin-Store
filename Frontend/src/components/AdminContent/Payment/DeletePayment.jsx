/* eslint-disable react/prop-types */
import { Button, Modal, Box, Typography, ButtonGroup } from "@mui/material";
import { Delete as DeleteIcon, Cancel as CancelIcon } from "@mui/icons-material";

export default function DeletePayment({ paymentId, handleDeleteModalClose, handleConfirmDelete }) {
    return (
        <Modal
            open={!!paymentId}
            onClose={handleDeleteModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 8, boxShadow: 24, p: 4 }}>
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Delete Payment</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>apakah anda yakin ingin menghapus metode pembayaran ini?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonGroup>
                        <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                            <DeleteIcon sx={{ mr: 1 }} /> Hapus
                        </Button>
                        <Button variant="outlined" onClick={handleDeleteModalClose}>
                            <CancelIcon sx={{ mr: 1 }} /> Batal
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Modal>
    );
}