/* eslint-disable react/prop-types */
import { useState } from "react";
import { Collapse, TextField, Button, FormGroup } from "@mui/material";

const EditPayment = ({ payment, handleEditPaymentSubmit }) => {
    const [editedPayment, setEditedPayment] = useState({ ...payment });
    const [openEditForm, setOpenEditForm] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPayment({ ...editedPayment, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleEditPaymentSubmit(editedPayment);
        setOpenEditForm(false);
    };

    return (
        <Collapse in={openEditForm}>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Nama Pembayaran"
                        name="name"
                        value={editedPayment.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Biaya Pembayaran"
                        name="paymentCost"
                        type="number"
                        value={editedPayment.paymentCost}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="success" type="submit">Simpan</Button>
                </FormGroup>
            </form>
        </Collapse>
    );
};

export default EditPayment;
