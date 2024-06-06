import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Collapse, TableContainer, ButtonGroup, Box } from "@mui/material";
import { AddCircle, Delete, Edit, Restore, Visibility, VisibilityOff } from "@mui/icons-material";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { getAdminCategories, addAdminCategory, editAdminCategory, deleteAdminCategory, restoreAdminCategory } from '../../../services/api/adminApi'; // Import fungsi-fungsi API
import { useAuth } from '../../../contexts/AuthContext';

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const { authToken } = useAuth(); // Mengambil token autentikasi dari useAuth

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDeleted]);

  // Mengambil dan menetapkan data kategori dari API
  const getAllCategories = async () => {
    const categoriesData = await getAdminCategories(!showDeleted, authToken); // Menggunakan authToken dari useAuth
    setCategories(categoriesData);
  };

  // Menyembunyikan atau menampilkan kategori yang telah dihapus
  const handleToggleShowDeleted = () => {
    setShowDeleted(!showDeleted);
  };

  // Menampilkan atau menyembunyikan form tambah kategori
  const handleAddFormToggle = () => {
    setOpenAddForm(!openAddForm);
  };

  // Menampilkan atau menyembunyikan form edit kategori
  const handleEditFormToggle = (categoryId) => {
    setEditedCategoryId(prevState => prevState === categoryId ? null : categoryId);
  };

  // Menetapkan kategori yang akan dihapus
  const handleDeleteCategory = (categoryId) => {
    setDeleteCategory(categoryId);
  };

  // Mengonfirmasi penghapusan kategori
  const handleConfirmDelete = async () => {
    const success = await deleteAdminCategory(deleteCategory, authToken); // Menggunakan authToken dari useAuth
    if (success) {
      getAllCategories(); // Ambil kategori lagi setelah penghapusan
      setDeleteCategory(null);
    }
  };

  // Menambahkan kategori baru
  const handleCategoryAdded = async (newCategory) => {
    await addAdminCategory(newCategory, authToken); // Menggunakan authToken dari useAuth
    setOpenAddForm(false);
    getAllCategories(); // Ambil kategori lagi setelah menambahkan kategori baru
  };

  // Mengirim pembaruan kategori ke API
  const handleEditCategorySubmit = async (editedCategory) => {
    await editAdminCategory(editedCategory, authToken); // Menggunakan authToken dari useAuth
    setEditedCategoryId(null);
    getAllCategories(); // Ambil kategori lagi setelah pembaruan
  };

  // Merestorasi kategori yang telah dihapus
  const handleRestoreCategory = async (categoryId) => {
    await restoreAdminCategory(categoryId, authToken); // Menggunakan authToken dari useAuth
    getAllCategories(); // Ambil kategori lagi setelah restorasi
  };

  return (
    <>
      {/* Tombol untuk menambahkan kategori baru dan menampilkan kategori yang dihapus */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          onClick={handleAddFormToggle}
          startIcon={<AddCircle />}
          sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold', mb: 2 }}
        >
          Tambah Kategori
        </Button>
        <Button
          variant="contained"
          onClick={handleToggleShowDeleted}
          sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold', mb: 2 }}
          startIcon={showDeleted ? <VisibilityOff /> : <Visibility />}
        >
          {showDeleted ? "Tampilkan Tersedia" : "Tampilkan Dihapus"}
        </Button>
      </Box>

      {/* Komponen form untuk menambah kategori baru */}
      <AddCategory
        openAddModal={openAddForm}
        handleAddModalClose={() => setOpenAddForm(false)}
        handleCategoryAdded={handleCategoryAdded}
      />

      {/* Komponen form untuk menghapus kategori */}
      <DeleteCategory
        category={deleteCategory}
        handleDeleteModalClose={() => setDeleteCategory(null)}
        handleConfirmDelete={handleConfirmDelete}
      />

      {/* Tabel untuk menampilkan daftar kategori */}
      <TableContainer sx={{ borderRadius: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#634C9F', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ backgroundColor: '#634C9F', color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    {/* Tombol untuk mengedit kategori */}
                    <Button variant='contained' color="warning" onClick={() => handleEditFormToggle(category.id)}>
                      <Edit />
                    </Button>
                    {/* Tombol untuk menghapus atau merestorasi kategori */}
                    {category.isActive ? (
                      <Button variant='contained' color="error" onClick={() => handleDeleteCategory(category.id)}>
                        <Delete />
                      </Button>
                    ) : (
                      <Button variant='contained' color="success" onClick={() => handleRestoreCategory(category.id)}>
                        <Restore />
                      </Button>
                    )}
                  </ButtonGroup>
                  {/* Form untuk mengedit kategori */}
                  <Collapse in={editedCategoryId === category.id}>
                    <EditCategory
                      category={category}
                      handleEditCategorySubmit={handleEditCategorySubmit}
                      handleDeleteCategory={handleDeleteCategory}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
