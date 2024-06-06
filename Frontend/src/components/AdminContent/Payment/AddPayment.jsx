/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Collapse, TextField, Button, Box } from "@mui/material";

export default function AddPayment({ openAddModal, handleAddModalClose, handlePaymentAdded, apiPaymentsUrl }) {
    const [newPayment, setNewPayment] = useState({ name: "", paymentCost: 0 });

    // Fungsi untuk meng-handle submit form tambah metode pembayaran
    const handleAddPaymentSubmit = () => {
        axios.post(apiPaymentsUrl, newPayment)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                handleAddModalClose();
                setNewPayment({ name: "", paymentCost: 0 });
                handlePaymentAdded();
            })
            .catch(error => {
                console.error("Terjadi kesalahan saat menambahkan pembayaran:", error);
            });
    };

    // Fungsi untuk meng-handle perubahan input pada form tambah metode pembayaran
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Collapse in={openAddModal}>
            <Box p={2}>
                <TextField
                    label="Nama Pembayaran"
                    name="name"
                    value={newPayment.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Biaya Pembayaran"
                    type="number"
                    name="paymentCost"
                    value={newPayment.paymentCost}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    onClick={handleAddPaymentSubmit}
                    sx={{ bgcolor: "#634C9F", color: "white", mt: 2 }}
                >
                    Tambah Pembayaran
                </Button>
            </Box>
        </Collapse>
    );
}