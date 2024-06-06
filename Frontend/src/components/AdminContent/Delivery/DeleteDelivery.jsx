/* eslint-disable react/prop-types */
import { Button, Modal, Box, Typography } from "@mui/material";
import { Delete as DeleteIcon, Cancel as CancelIcon } from "@mui/icons-material";

export default function DeleteDelivery({ deliveryId, handleDeleteModalClose, handleConfirmDelete }) {
    return (
        <Modal
            open={!!deliveryId}
            onClose={handleDeleteModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 8, boxShadow: 24, p: 4 }}>
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Delete Delivery</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>Apakah anda yakin ingin menghapus jasa mengiriman ini?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleConfirmDelete} sx={{ bgcolor: "#FF0000", color: "white", mr: 2 }}>
                        <DeleteIcon sx={{ mr: 1 }} /> Delete
                    </Button>
                    <Button variant="outlined" onClick={handleDeleteModalClose}>
                        <CancelIcon sx={{ mr: 1 }} /> Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
