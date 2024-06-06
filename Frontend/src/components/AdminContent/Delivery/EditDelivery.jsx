/* eslint-disable react/prop-types */
import { useState } from "react";
import { Collapse, TextField, Button, FormControl } from "@mui/material";

export default function EditDelivery({ delivery, handleEditDeliverySubmit }) {
    const [editedDelivery, setEditedDelivery] = useState({ ...delivery });
    const [openEditForm, setOpenEditForm] = useState(true);

    // Fungsi untuk mengubah nilai state editedDelivery berdasarkan input user
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedDelivery(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Fungsi untuk mengirimkan data editedDelivery ke handleEditDeliverySubmit dan mengembalikan form ke state closed
    const handleSubmit = (event) => {
        event.preventDefault();
        handleEditDeliverySubmit(editedDelivery);
        setOpenEditForm(false);
    };

    return (
        <Collapse in={openEditForm}>
            <FormControl onSubmit={handleSubmit}>
                <TextField
                    label="Nama Pengiriman"
                    name="name"
                    value={editedDelivery.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Harga Pengiriman"
                    type="number"
                    name="price"
                    value={editedDelivery.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={handleSubmit} type="submit">Simpan</Button>
            </FormControl>
        </Collapse>
    );
}