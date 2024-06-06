/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { TableCell, TableRow, TextField, Collapse, FormGroup, Button, ButtonGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CartItem = ({ item, index, temporaryQuantities, handleQuantityChange, handleDeleteItemClick, handleEditClick, isEditing, saveChanges }) => {
  const [openEditForm, setOpenEditForm] = useState(isEditing);

  useEffect(() => {
    setOpenEditForm(isEditing);
  }, [isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveChanges(item.id);
    setOpenEditForm(false);
  };

  return (
    <>
      <TableRow key={item.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={`https://localhost:7249/Resources/${item.productImage}`} alt={item.name} width="50" height="50" style={{ marginRight: '10px' }} />
          {item.productName}
        </TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
        <TableCell>{(item.productPrice * item.quantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
        <TableCell >
          <ButtonGroup>
            <Button variant="contained" color='warning' onClick={() => { handleEditClick(item.id); setOpenEditForm(!openEditForm); }}>
              <EditIcon />
            </Button>
            <Button variant="contained" color='error' onClick={() => handleDeleteItemClick(index, item.id)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
          <Collapse in={openEditForm}>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <TextField
                  label="Jumlah"
                  type="number"
                  value={temporaryQuantities[item.id]}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="success" type="submit">Simpan Perubahan</Button>
              </FormGroup>
            </form>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItem;
