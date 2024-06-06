/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Star from '@mui/icons-material/Star';
import { Avatar, Box, Button, Card, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ProductCardFilter from '../../../components/Product/ProductCardFilter';
import { useAuth } from '../../../contexts/AuthContext';
import { useCategories } from '../../../contexts/CategoryContext';
import { AddToCart } from '../../../components/Button/AddToCart';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { formatDate } from '../../../utils/helpers';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';
import { useDispatch } from 'react-redux';

export default function ProductDetail() {
    const { id } = useParams();
    const { filterProductsByCategoryId, categories } = useCategories();
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authToken } = useAuth();

    // Menghitung rata-rata rating produk berdasarkan ulasan
    const averageRating = comments.length > 0 ? comments.reduce((acc, current) => acc + current.rating, 0) / comments.length : 0;

    // Efek samping untuk mendapatkan detail produk dan ulasan saat komponen dimuat
    useEffect(() => {
        // Fetch detail produk
        axios.get(`https://localhost:7249/api/Product/${id}`)
            .then((response) => {
                setProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Fetch ulasan untuk produk
        axios.get(`https://localhost:7249/product/${id}`)
            .then((response) => {
                setComments(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });

        // Fungsi untuk memeriksa apakah produk sudah ada di keranjang
        const checkIfProductInCart = async () => {
            try {
                if (authToken != null) {
                    const cartResponse = await axios.get('https://localhost:7249/api/Cart', {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    const productInCart = cartResponse.data.data.find(item => item.id === id);
                    if (productInCart) {
                        setIsInCart(true);
                        setQuantity(productInCart.quantity);
                    }
                }
            } catch (error) {
                console.error('Error checking if product is in cart:', error);
            }
        };

        checkIfProductInCart();
    }, [id, filterProductsByCategoryId, authToken]);

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = async () => {
        try {
            // Cek apakah pengguna sudah login
            if (!authToken) {
                // Jika belum login, redirect ke halaman login
                console.log('Pengguna belum login. Mengarahkan ke halaman login...');
                navigate('/login');
                return;
            }

            // Panggil fungsi addToCart untuk menambahkan item ke keranjang
            await AddToCart(product.id, authToken);
            dispatch(showSnackbar({ title: 'Success', message: 'Item berhasil ditambahkan ke keranjang', type: 'success' }));
            // Set state isInCart menjadi true dan set kuantitas kembali ke 1
            setIsInCart(true);
            setQuantity(1);
        } catch (error) {
            // Tangani kesalahan jika gagal menambahkan item ke keranjang
            console.error('Gagal menambahkan produk ke keranjang:', error);
            dispatch(showSnackbar({ title: 'Error', message: 'Gagal menambahkan item ke keranjang', type: 'error' }));
        }
    };


    return (
        <Container sx={{ my: 1 }}>
            <Grid container spacing={0} sx={{ bgcolor: '#fafafa', borderRadius: 3 }}>
                <Grid container item xs={12} sm={6} sx={{ p: 2, borderRadius: 3 }}>
                    <Container sx={{ bgcolor: '#ffffff', p: 2, borderRadius: 3 }}>
                        {product.productImage && (
                            <img src={`https://localhost:7249/Resources/${product.productImage}`} alt={product.name} style={{ width: '100%', borderRadius: 3 }} />
                        )}
                    </Container>
                </Grid>
                <Grid container item xs={12} sm={6} sx={{ p: 2, borderRadius: 3 }}>
                    <Container sx={{ bgcolor: '#ffffff', p: 2, borderRadius: 3 }}>
                        <Typography variant='h4'>
                            {product.name}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6' color='grey'>
                                {product.price && `${product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}
                            </Typography>
                            <Typography variant='h6' color='orange' sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Star />
                                {comments.length > 0 ? averageRating.toFixed(1) : 'Belum ada ulasan'}
                            </Typography>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Kategori</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Stok</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Deskripsi</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Terakhir di-restock</TableCell>
                                        <TableCell>{formatDate(product.updatedDate)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                            <Button variant='contained' color='success' onClick={handleAddToCart} sx={{ mr: 1 }}>Tambah ke Keranjang</Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => navigate(`/beli-sekarang/${id}`)} // Navigasi ke halaman BuyNowPage dengan ID produk
                            >
                                Beli Sekarang
                            </Button>
                        </div>
                    </Container>
                </Grid>
            </Grid>

            <Paper sx={{ my: 2, p: 2, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                        Ulasan
                    </Typography>
                    <Button
                        component={Link}
                        to={`/ulasan/${id}`}
                        size='small'
                        variant='contained'
                        style={{
                            backgroundColor: '#634C9F',
                            borderRadius: 18,
                            marginTop: 10,
                            marginBottom: 12,
                            textTransform: "none",
                            fontFamily: 'Tahoma',
                            fontWeight: 'bold'
                        }}>
                        Lihat semua <ArrowRightAltIcon />
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {/* Menampilkan tiga ulasan terbaru atau pesan jika tidak ada ulasan */}
                    {comments.length > 0 ? comments.slice(0, 3).map((comment) => (
                        <Grid item xs={12} sm={6} md={4} key={comment.id}>
                            <Card sx={{
                                p: 2,
                                borderRadius: 3,
                                boxShadow: 3
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    {/* Menampilkan avatar jika profil pengguna null */}
                                    {comment.userProfile ? (
                                        <Avatar src={`https://localhost:7249/Resources/${comment.userProfile}`} sx={{ width: 40, height: 40, marginRight: 1, boxShadow: 3 }} />
                                    ) : (
                                        <Avatar sx={{ width: 40, height: 40, marginRight: 1 }}>
                                            {comment.userName.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', ml: 1 }}>
                                        {comment.userName}
                                    </Typography>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        {comment.commentImg && (
                                            <img src={`https://localhost:7249/Resources/${comment.commentImg}`} alt="Comment Image" width='50px' height='50px' />
                                        )}
                                        <Typography variant='body1' sx={{ fontSize: '1.1rem', color: 'text.secondary', marginBottom: 1 }}>
                                            {comment.commentText}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    </Grid>
                                </Grid>
                                <Typography variant='body2' sx={{ fontSize: '0.9rem', color: 'text.secondary', marginBottom: 1 }}>
                                    {formatDate(comment.commentDate)}
                                </Typography>
                                <Typography variant='h5' color='orange' sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}>
                                    <Star />
                                    {comment.rating}
                                </Typography>
                            </Card>
                        </Grid>
                    )) : (
                        <Typography variant='body1' sx={{ fontSize: '1.1rem', color: 'text.secondary', width: '100%', p: 2 }}>
                            Belum ada ulasan...
                        </Typography>
                    )}
                </Grid>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: -1 }}>
                    Produk Terkait
                </Typography>
                {/* Menampilkan produk terkait dengan kategori yang sama dengan produk saat ini */}
                {categories.find(category => category.name === product.category) && (
                    <ProductCardFilter
                        categoryName={product.category}
                        categoryId={categories.find(category => category.name === product.category).id}
                    />
                )}
            </Paper>
        </Container >
    );
}