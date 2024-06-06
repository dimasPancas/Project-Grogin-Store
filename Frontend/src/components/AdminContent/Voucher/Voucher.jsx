import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, ButtonGroup, Box } from "@mui/material";
import { AddCircle, Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import AddVoucher2 from "./AddVoucher2";
import EditVoucher2 from "./EditVoucher2";
import DeleteVoucher2 from "./DeleteVoucher2";
import { useAuth } from "../../../contexts/AuthContext";
import { getAdminVouchers, getAdminVoucherById } from "../../../services/api/adminApi";

export default function Voucher() {
  const { authToken } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [showActiveVouchers, setShowActiveVouchers] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [voucherToEdit, setVoucherToEdit] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);

  useEffect(() => {
    fetchVouchers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showActiveVouchers, authToken]);

  const fetchVouchers = async () => {
    try {
      const data = await getAdminVouchers(showActiveVouchers, authToken);
      setVouchers(data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const handleToggleShowActiveVouchers = () => {
    setShowActiveVouchers(!showActiveVouchers);
  };

  const handleAddVoucherClick = () => {
    setOpenAddModal(true);
  };

  const handleEditVoucherClick = async (voucherId) => {
    try {
      const voucher = await getAdminVoucherById(voucherId, authToken);
      setVoucherToEdit(voucher);
      setOpenEditModal(true);
    } catch (error) {
      console.error("Error fetching voucher by ID:", error);
    }
  };

  const handleDeleteVoucherClick = (voucher) => {
    setVoucherToDelete(voucher);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddVoucherClick}
          startIcon={<AddCircle />}
          sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
        >
          Tambah Voucher
        </Button>
        <Button
          variant="contained"
          onClick={handleToggleShowActiveVouchers}
          sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
          startIcon={showActiveVouchers ? <VisibilityOff /> : <Visibility />}
        >
          {showActiveVouchers ? "Tampilkan Non-Aktif" : "Tampilkan Aktif"}
        </Button>
      </Box>
      <TableContainer sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#634C9F', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Tipe</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Diskon (%)</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Diskon Max (Rp)</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Maksimal Klaim</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Tanggal Kadaluarsa</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers && vouchers.length > 0 ? (
              vouchers.map((voucher, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                  <TableCell>{voucher.name}</TableCell>
                  <TableCell>{voucher.type === 1 ? 'Diskon' : 'Gratis Ongkir'}</TableCell>
                  <TableCell>{voucher.discountValue}%</TableCell>
                  <TableCell>{voucher.maxDiscountAmount}</TableCell>
                  <TableCell>{voucher.maxRedemptions}</TableCell>
                  <TableCell>{new Date(voucher.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{voucher.isActive ? 'Aktif' : 'Tidak Aktif'}</TableCell>
                  <TableCell>
                    {voucher.isActive && (
                      <ButtonGroup>
                        <Button variant='contained' color="warning" onClick={() => handleEditVoucherClick(voucher.id)}>
                          <Edit />
                        </Button>
                        <Button variant='contained' color="error" onClick={() => handleDeleteVoucherClick(voucher)}>
                          <Delete />
                        </Button>
                      </ButtonGroup>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Tidak ada voucher yang tersedia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddVoucher2
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        authToken={authToken}
        fetchVouchers={fetchVouchers}
      />

      <EditVoucher2
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initialData={voucherToEdit}
        authToken={authToken}
        fetchVouchers={fetchVouchers}
      />

      <DeleteVoucher2
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        voucher={voucherToDelete}
        authToken={authToken}
        fetchVouchers={fetchVouchers}
      />
    </>
  );
}
