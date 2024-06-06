import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup, Box, TableContainer, Collapse } from "@mui/material";
import { AddCircle, Delete, Edit, Restore, Visibility, VisibilityOff } from "@mui/icons-material";
import AddPayment from './AddPayment';
import EditPayment from './EditPayment';
import DeletePayment from './DeletePayment';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function PaymentAdmin() {
    const apiPaymentsUrl = "https://localhost:7249/api/Payment/admin";
    const [payments, setPayments] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [editedPaymentId, setEditedPaymentId] = useState(null);
    const [deletePaymentId, setDeletePaymentId] = useState(null);
    const [showActivePayments, setShowActivePayments] = useState(true);
    const { authToken } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPayments();
    }, [showActivePayments]);

    const fetchPayments = async () => {
        try {
            const response = await axios.get(`${apiPaymentsUrl}?IsActive=${showActivePayments}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setPayments(response.data.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
            dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat mengambil data pembayaran', type: 'error' }));
        }
    };

    const handleToggleShowActivePayments = () => {
        setShowActivePayments(!showActivePayments);
    };

    const handleAddFormToggle = () => {
        setOpenAddForm(!openAddForm);
    };

    const handleEditFormToggle = (paymentId) => {
        setEditedPaymentId(editedPaymentId === paymentId ? null : paymentId);
    };

    const handleDeletePayment = (paymentId) => {
        setDeletePaymentId(paymentId);
    };

    const handleRestorePayment = (paymentId) => {
        axios.patch(`${apiPaymentsUrl}/restore/${paymentId}`, {}, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => {
                console.log("Payment restored:", response.data);
                fetchPayments();
                dispatch(showSnackbar({ title: 'Success', message: 'Pembayaran berhasil dipulihkan', type: 'success' }));
            })
            .catch(error => {
                console.error("Error restoring payment:", error);
                dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memulihkan pembayaran', type: 'error' }));
            });
    };

    const handleConfirmDelete = () => {
        axios.delete(`${apiPaymentsUrl}/${deletePaymentId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                console.log("Payment deleted:", deletePaymentId);
                fetchPayments();
                setDeletePaymentId(null);
                dispatch(showSnackbar({ title: 'Success', message: 'Pembayaran berhasil dihapus', type: 'success' }));
            })
            .catch(error => {
                console.error("Error deleting payment:", error);
                dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat menghapus pembayaran', type: 'error' }));
            });
    };

    const handlePaymentAdded = () => {
        fetchPayments();
        setOpenAddForm(false);
        dispatch(showSnackbar({ title: 'Success', message: 'Pembayaran berhasil ditambahkan', type: 'success' }));
    };

    const handleEditPaymentSubmit = (editedPayment) => {
        axios.patch(`${apiPaymentsUrl}/${editedPayment.id}`, editedPayment, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => {
                console.log("Payment updated:", response.data);
                fetchPayments();
                setEditedPaymentId(null);
                dispatch(showSnackbar({ title: 'Success', message: 'Pembayaran berhasil diperbarui', type: 'success' }));
            })
            .catch(error => {
                console.error("Error updating payment:", error);
                dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memperbarui pembayaran', type: 'error' }));
            });
    };

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Button
                    variant="contained"
                    onClick={handleAddFormToggle}
                    startIcon={<AddCircle />}
                    sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
                >
                    Tambah Metode Pembayaran
                </Button>
                <Button
                    variant="contained"
                    onClick={handleToggleShowActivePayments}
                    sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
                    startIcon={showActivePayments ? <VisibilityOff /> : <Visibility />}
                >
                    {showActivePayments ? "Tampilkan Nonaktif" : "Tampilkan Aktif"}
                </Button>
            </Box>
            <AddPayment
                openAddModal={openAddForm}
                handleAddModalClose={() => setOpenAddForm(false)}
                handlePaymentAdded={handlePaymentAdded}
                apiPaymentsUrl={apiPaymentsUrl}
            />
            <DeletePayment
                paymentId={deletePaymentId}
                handleDeleteModalClose={() => setDeletePaymentId(null)}
                handleConfirmDelete={handleConfirmDelete}
            />
            <TableContainer sx={{ borderRadius: 2 }} >
                <Table>
                    <TableHead sx={{ backgroundColor: '#634C9F', color: 'white' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Nama Payment</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Biaya Payment</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.name}</TableCell>
                                <TableCell>{payment.paymentCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                <TableCell>
                                    <ButtonGroup>
                                        <Button variant='contained' color="warning" onClick={() => handleEditFormToggle(payment.id)}>
                                            <Edit />
                                        </Button>
                                        {payment.isActive ? (
                                            <Button variant='contained' color="error" onClick={() => handleDeletePayment(payment.id)}>
                                                <Delete />
                                            </Button>
                                        ) : (
                                            <Button variant='contained' color="success" onClick={() => handleRestorePayment(payment.id)}>
                                                <Restore />
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                    <Collapse in={editedPaymentId === payment.id}>
                                        <EditPayment
                                            payment={payment}
                                            handleEditPaymentSubmit={handleEditPaymentSubmit}
                                        />
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
