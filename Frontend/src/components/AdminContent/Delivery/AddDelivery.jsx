/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Collapse, TextField, Button, Box } from "@mui/material";

export default function AddDelivery({ openAddModal, handleAddModalClose, handleDeliveryAdded, apiDeliveriesUrl }) {
    const [newDelivery, setNewDelivery] = useState({ name: "", price: 0 });

    const handleAddDeliverySubmit = () => {
        axios.post(apiDeliveriesUrl, newDelivery)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                handleAddModalClose(); // Tutup form tambah pengiriman setelah berhasil menambahkan pengiriman
                setNewDelivery({ name: "", price: 0 }); // Reset data pengiriman baru
                handleDeliveryAdded(); // Memberi tahu komponen induk bahwa pengiriman telah ditambahkan
            })
            .catch(error => {
                console.error("Error adding delivery:", error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewDelivery(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Collapse in={openAddModal}>
            <Box p={2}>
                <TextField
                    label="Delivery Name"
                    name="name"
                    value={newDelivery.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Price"
                    type="number"
                    name="price"
                    value={newDelivery.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    onClick={handleAddDeliverySubmit}
                    sx={{ bgcolor: "#634C9F", color: "white", mt: 2 }}
                >
                    Add Delivery
                </Button>
            </Box>
        </Collapse>
    );
}