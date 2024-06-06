import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, ButtonGroup, Collapse } from "@mui/material";
import { AddCircle, Delete, Edit, Restore } from "@mui/icons-material";
import AddDelivery from './AddDelivery';
import EditDelivery from './EditDelivery';
import DeleteDelivery from './DeleteDelivery';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function DeliveryAdmin() {
    const apiDeliveriesUrl = "https://localhost:7249/api/Delivery/admin";
    const [deliveries, setDeliveries] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [editedDeliveryId, setEditedDeliveryId] = useState(null);
    const [deleteDeliveryId, setDeleteDeliveryId] = useState(null);
    const [showActive, setShowActive] = useState(true);
    const dispatch = useDispatch();

    // Mengambil data pengiriman saat komponen dimuat atau ketika showActive berubah
    useEffect(() => {
        fetchDeliveries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showActive]);

    // Fungsi untuk mengambil data pengiriman dari API
    const fetchDeliveries = async () => {
        try {
            const response = await axios.get(`${apiDeliveriesUrl}?isActive=${showActive}`);
            setDeliveries(response.data.data);
        } catch (error) {
            console.error("Error fetching deliveries:", error);
            dispatch(showSnackbar({ title: "Error", message: "Gagal mengambil data pengiriman", type: "error" }));
        }
    };

    // Fungsi untuk menampilkan/menyembunyikan form tambah pengiriman
    const handleAddFormToggle = () => {
        setOpenAddForm(!openAddForm);
    };

    // Fungsi untuk menampilkan/menyembunyikan form edit pengiriman
    const handleEditFormToggle = (deliveryId) => {
        setEditedDeliveryId(editedDeliveryId === deliveryId ? null : deliveryId);
    };

    // Fungsi untuk menentukan pengiriman yang akan dihapus
    const handleDeleteDelivery = (deliveryId) => {
        setDeleteDeliveryId(deliveryId);
    };

    // Fungsi untuk mengembalikan pengiriman yang dihapus
    const handleRestoreDelivery = async (deliveryId) => {
        try {
            const response = await axios.patch(`${apiDeliveriesUrl}/restore/${deliveryId}`);
            console.log("Delivery restored:", response.data);
            fetchDeliveries();
            dispatch(showSnackbar({ title: "Sukses", message: "Jasa pengiriman berhasil dikembalikan", type: "success" }));
        } catch (error) {
            console.error("Error restoring delivery:", error);
            dispatch(showSnackbar({ title: "Error", message: "Gagal mengembalikan pengiriman", type: "error" }));
        }
    };

    // Fungsi untuk mengkonfirmasi penghapusan pengiriman
    const handleConfirmDelete = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.delete(`${apiDeliveriesUrl}/${deleteDeliveryId}`);
            console.log("Delivery deleted:", deleteDeliveryId);
            fetchDeliveries();
            setDeleteDeliveryId(null);
            dispatch(showSnackbar({ title: "Sukses", message: "Jasa pengiriman berhasil dihapus", type: "success" }));
        } catch (error) {
            console.error("Error deleting delivery:", error);
            dispatch(showSnackbar({ title: "Error", message: "Gagal menghapus jasa pengiriman", type: "error" }));
        }
    };

    // Fungsi untuk menangani penambahan pengiriman
    const handleDeliveryAdded = () => {
        fetchDeliveries();
        setOpenAddForm(false);
        dispatch(showSnackbar({ title: "Sukses", message: "Jasa pengiriman berhasil ditambahkan", type: "success" }));
    };

    // Fungsi untuk menangani pengiriman yang diedit
    const handleEditDeliverySubmit = async (editedDelivery) => {
        try {
            const response = await axios.patch(`${apiDeliveriesUrl}/${editedDelivery.id}`, editedDelivery);
            console.log("Delivery updated:", response.data);
            fetchDeliveries();
            setEditedDeliveryId(null);
            dispatch(showSnackbar({ title: "Sukses", message: "Jasa pengiriman berhasil diperbarui", type: "success" }));
        } catch (error) {
            console.error("Error updating delivery:", error);
            dispatch(showSnackbar({ title: "Error", message: "Gagal memperbarui jasa pengiriman", type: "error" }));
        }
    };

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            {/* Tombol untuk menampilkan/menyembunyikan form tambah pengiriman */}
            <Button
                variant="contained"
                onClick={handleAddFormToggle}
                startIcon={<AddCircle />}
                sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold', mb: 2 }}
            >
                Jasa Pengiriman
            </Button>
            {/* Tombol untuk menampilkan pengiriman aktif atau tidak */}
            <Button onClick={() => setShowActive(!showActive)}>
                {showActive ? "Tampilkan Tidak Aktif" : "Tampilkan Aktif"}
            </Button>
            {/* Form untuk menambah pengiriman */}
            <AddDelivery
                openAddModal={openAddForm}
                handleAddModalClose={() => setOpenAddForm(false)}
                handleDeliveryAdded={handleDeliveryAdded}
                apiDeliveriesUrl={apiDeliveriesUrl}
            />
            {/* Form untuk menghapus pengiriman */}
            <DeleteDelivery
                deliveryId={deleteDeliveryId}
                handleDeleteModalClose={() => setDeleteDeliveryId(null)}
                handleConfirmDelete={handleConfirmDelete}
            />
            {/* Tabel untuk menampilkan data pengiriman */}
            <TableContainer sx={{ borderRadius: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#634C9F', color: 'white' }}>
                        <TableRow>
                            {/* Header tabel */}
                            <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>No</TableCell>
                            <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
                            <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Harga</TableCell>
                            <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Status Aktif</TableCell>
                            <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Menampilkan setiap baris data pengiriman */}
                        {deliveries.map((delivery, index) => (
                            <TableRow key={delivery.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{delivery.name}</TableCell>
                                <TableCell>{delivery.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                <TableCell>{delivery.isActive ? "Yes" : "No"}</TableCell>
                                <TableCell>
                                    <ButtonGroup>
                                        <Button variant='contained' color="warning" onClick={() => handleEditFormToggle(delivery.id)}>
                                            <Edit />
                                        </Button>
                                        {delivery.isActive ? (
                                            <Button variant='contained' color="error" onClick={() => handleDeleteDelivery(delivery.id)}>
                                                <Delete />
                                            </Button>
                                        ) : (
                                            <Button variant='contained' color="success" onClick={() => handleRestoreDelivery(delivery.id)}>
                                                <Restore />
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                    {/* Collapsenya di sini */}
                                    <Collapse in={editedDeliveryId === delivery.id}>
                                        <EditDelivery
                                            delivery={delivery}
                                            handleEditDeliverySubmit={handleEditDeliverySubmit}
                                        />
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
