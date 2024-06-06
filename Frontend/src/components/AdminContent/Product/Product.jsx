import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddProductModal from './AddProduct';
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import ProductDetailModal from "./ProductDetailModal";
import { AddCircle, Delete, Edit, Search, Visibility, VisibilityOff, Restore } from "@mui/icons-material";
import { Box, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, MenuItem, ButtonGroup, TableContainer } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch } from 'react-redux';
import { showSnackbar } from "../../../redux/slices/snackbarSlice";

export default function Product() {
    const apiProductsUrl = "https://localhost:7249/api/Product/admin";
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(1000);
    const [showActiveProducts, setShowActiveProducts] = useState(true);
    const [openProductDetailModal, setOpenProductDetailModal] = useState(false); // State untuk modal detail produk
    const [productDetail, setProductDetail] = useState(null); // State untuk menyimpan detail produk
    const { authToken } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetAllProductsClick();
        if (id) {
            axios
                .get(`https://localhost:7249/api/Product/${id}`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData && responseData.status === 200 && responseData.data) {
                        setSelectedProduct(responseData.data);
                    } else {
                        console.error("Invalid response format:", responseData);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, pageNumber, pageSize, showActiveProducts]);

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    };

    const handlePageNumberChange = (event, value) => {
        setPageNumber(value);
    };

    const handleGetAllProductsClick = async () => {
        // Mengambil semua produk dari server dengan parameter yang sesuai
        try {
            const response = await axios.get(apiProductsUrl, {
                params: {
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                    search: searchText,
                    isActive: showActiveProducts
                },
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const responseData = response.data;
            if (responseData && (response.status === 200 || response.status === 201) && responseData.data) {
                setProducts(responseData.data.items);
                setTotalItems(responseData.data.totalItemsCount);
            } else {
                console.error("Format respons tidak valid:", responseData);
            }
        } catch (error) {
            console.error("Kesalahan dalam mengambil produk:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Memanggil fungsi untuk mencari produk berdasarkan teks pencarian
        handleGetAllProductsClick();
    };

    const handleToggleShowActiveProducts = () => {
        // Mengubah status tampilan produk aktif/nonaktif
        setShowActiveProducts(!showActiveProducts);
        handleGetAllProductsClick();
    };

    const handleAddProductClick = () => {
        setOpenAddModal(true);
    };

    const handleAddProductSubmit = async (newProduct) => {
        // Menambahkan produk baru
        try {
            const response = await axios.post(apiProductsUrl, newProduct, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const responseData = response.data;

            if ((response.status === 200 || response.status === 201) && responseData && responseData.data) {
                const addedProduct = responseData.data;
                setProducts([...products, addedProduct]);
                setOpenAddModal(false);
                handleGetAllProductsClick();
                dispatch(showSnackbar({ title: 'Success', message: 'Produk berhasil ditambahkan', type: 'success' }));
            } else {
                console.error("Format respons tidak valid:", responseData);
                dispatch(showSnackbar({ title: 'Error', message: 'Format respons tidak valid', type: 'error' }));
            }
        } catch (error) {
            console.error("Kesalahan dalam menambahkan produk:", error);
            dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan dalam menambahkan produk', type: 'error' }));
        } finally {
            setOpenAddModal(false);
        }
    };

    const handleEditProductClick = async (product) => {
        // Mengedit produk yang dipilih
        setIsLoading(true);
        try {
            const fetchedProductResponse = await axios.get(`${apiProductsUrl}/${product.id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const responseData = fetchedProductResponse.data;
            if (responseData && responseData.status === 200 && responseData.data) {
                setSelectedProduct(responseData.data);
                setOpenEditModal(true); // Membuka modal setelah data produk diatur
            } else {
                console.error("Format respons tidak valid:", responseData);
            }
        } catch (error) {
            console.error("Kesalahan dalam mengambil produk:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditProductSubmit = async (updatedProduct) => {
        // Menyimpan perubahan produk yang sudah diedit
        try {
            const response = await axios.patch(`${apiProductsUrl}/${updatedProduct.id}`, updatedProduct, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const responseData = response.data;
            if (responseData && responseData.status === 200 && responseData.data) {
                const updatedProductData = responseData.data;
                setProducts(products.map((p) => (p.id === updatedProductData.id ? updatedProductData : p)));
                setOpenEditModal(false);
                dispatch(showSnackbar({ title: 'Success', message: 'Produk berhasil diedit', type: 'success' }));
            } else {
                console.error("Format respons tidak valid:", responseData);
                dispatch(showSnackbar({ title: 'Error', message: 'Format respons tidak valid', type: 'error' }));
            }
        } catch (error) {
            console.error("Kesalahan dalam mengedit produk:", error);
            dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan dalam mengedit produk', type: 'error' }));
        } finally {
            handleGetAllProductsClick();
        }
    };

    const handleDeleteProduct = (productId, productName) => {
        // Mengatur produk yang akan dihapus
        setProductToDelete({ id: productId, name: productName });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        // Mengonfirmasi penghapusan produk
        if (productToDelete) {
            try {
                await axios.delete(`${apiProductsUrl}/${productToDelete.id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                setProducts(products.filter((p) => p.id !== productToDelete.id));
                setDeleteModalOpen(false);
                dispatch(showSnackbar({ title: 'Success', message: 'Produk berhasil dihapus', type: 'success' }));
            } catch (error) {
                console.error("Kesalahan dalam menghapus produk:", error);
                dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan dalam menghapus produk', type: 'error' }));
            }
        }
    };

    const handleRestoreProduct = async (productId) => {
        // Mengembalikan produk yang tidak aktif menjadi aktif
        try {
            await axios.patch(`${apiProductsUrl}/restore/${productId}`, null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setProducts(products.map((p) => (p.id === productId ? { ...p, isActive: true } : p)));
            dispatch(showSnackbar({ title: 'Success', message: 'Produk berhasil dikembalikan', type: 'success' }));
        } catch (error) {
            console.error("Kesalahan dalam mengembalikan produk:", error);
            dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan dalam mengembalikan produk', type: 'error' }));
        }
    };

    const handleProductDetailClick = async (productId) => {
        // Mendapatkan detail produk dan membuka modal detail
        setIsLoading(true);
        try {
            const response = await axios.get(`https://localhost:7249/api/Product/admin/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const responseData = response.data;
            if (responseData && responseData.status === 200 && responseData.data) {
                setProductDetail(responseData.data);
                setOpenProductDetailModal(true);
            } else {
                console.error("Format respons tidak valid:", responseData);
            }
        } catch (error) {
            console.error("Kesalahan dalam mengambil detail produk:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AddProductModal
                openAddModal={openAddModal}
                handleAddModalClose={() => setOpenAddModal(false)}
                handleAddProductSubmit={handleAddProductSubmit}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Cari Produk"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearchChange}
                    sx={{ mr: 2 }}
                />
                <TextField
                    select
                    label="Ukuran Halaman"
                    variant="outlined"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    sx={{ mr: 2 }}
                >
                    {[5, 10, 20, 50].map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    onClick={handleSearchSubmit}
                    sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
                >
                    <Search /> Cari
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Button variant="contained" onClick={handleAddProductClick} sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}>
                    <AddCircle /> Tambah Produk
                </Button>
                <Button
                    variant="contained"
                    onClick={handleToggleShowActiveProducts}
                    sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold' }}
                    startIcon={showActiveProducts ? <VisibilityOff /> : <Visibility />}
                >
                    {showActiveProducts ? "Tampilkan Nonaktif" : "Tampilkan Aktif"}
                </Button>
            </Box>
            <Box component={Paper}>
                <TableContainer sx={{ borderRadius: 2 }} component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#634C9F' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopLeftRadius: '7px' }}>Produk</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Kategori</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Stok</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Harga</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopRightRadius: '7px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                (showActiveProducts && product.isActive) || (!showActiveProducts && !product.isActive) ? (
                                    <TableRow key={product.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={`https://localhost:7249/Resources/${product.productImage}`} alt={product.name} width="50" height="50" style={{ marginRight: '10px' }} />
                                            {product.name}
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                        <TableCell>{product.isActive ? 'Aktif' : 'Nonaktif'}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button variant='contained' color="info" onClick={() => handleProductDetailClick(product.id)}><Visibility /></Button>
                                                <Button variant='contained' color="warning" onClick={() => handleEditProductClick(product)} ><Edit /></Button>
                                                {product.isActive ? (
                                                    <Button variant='contained' color="error" onClick={() => handleDeleteProduct(product.id, product.name)} ><Delete /></Button>
                                                ) : (
                                                    <Button variant='contained' color="success" onClick={() => handleRestoreProduct(product.id)} ><Restore /></Button>
                                                )}
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ) : null
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Stack spacing={2} direction="row">
                    <Pagination count={Math.ceil(totalItems / pageSize)}
                        page={pageNumber}
                        onChange={handlePageNumberChange}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                backgroundColor: '#634C9F',
                                color: 'white',
                                boxShadow: 3,
                                "&.Mui-selected": {
                                    backgroundColor: 'white',
                                    color: '#634C9F',
                                }
                            }
                        }}
                    />
                </Stack>
            </Box>
            <EditProduct
                isLoading={isLoading}
                handleEditModalClose={() => setOpenEditModal(false)}
                openEditModal={openEditModal}
                initialProductData={selectedProduct}
                onSubmit={handleEditProductSubmit}
                hasProductData={!!selectedProduct}
            />
            <DeleteProduct
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleConfirmDelete}
                productName={productToDelete ? productToDelete.name : ''}
            />
            <ProductDetailModal
                open={openProductDetailModal}
                handleClose={() => setOpenProductDetailModal(false)}
                product={productDetail}
            />
        </>
    );
}
