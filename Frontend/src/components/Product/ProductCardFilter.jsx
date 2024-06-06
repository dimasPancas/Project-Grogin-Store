/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DropdownButton from '../Button/DropdownButton';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import { getProductFilter } from '../../services/api/customerApi'
import emptyProductImage from '../../assets/img/empty_products.png'

export default function ProductCardFilter({ categoryName, categoryId }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setIsLoading(true);
            try {
                const products = await getProductFilter(categoryId);
                const shuffledProducts = shuffleArray(products);
                setProducts(shuffledProducts);
            } catch (error) {
                console.error('Error mengambil produk:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);

    // Fungsi untuk mengacak array produk
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    return (
        <>
            {/* Judul kategori dan tombol "Lihat semua" */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{categoryName}</Typography>
                <Button
                    component={Link}
                    to={`/kategori?${categoryId}`}
                    size='small'
                    variant='contained'
                    sx={{
                        backgroundColor: '#634C9F',
                        borderRadius: 3,
                        marginTop: 2,
                        marginBottom: 2,
                        textTransform: "none",
                        fontFamily: 'Tahoma',
                        fontWeight: 'bold'
                    }}>
                    Lihat semua <ArrowRightAltIcon />
                </Button>
            </Box>
            {/* Grid untuk menampilkan produk */}
            <Grid container spacing={2}>
                {isLoading
                    ? Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                            {/* Skeleton loading untuk produk */}
                            <ProductCardSkeleton />
                        </Grid>
                    ))
                    : products.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ textAlign: 'center', width: '80%' }}>
                                <img src={emptyProductImage} alt="Empty Products" style={{ width: '100px', marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} />
                                <Typography variant="subtitle1" sx={{ color: 'grey', maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                                    Maaf, tidak ada produk yang tersedia untuk kategori <strong>{categoryName}</strong> saat ini.
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                                {/* Kartu produk */}
                                <Card sx={{
                                    borderRadius: 3,
                                    ":hover": { boxShadow: '0px 0px 3px 3px #634C9F' },
                                    mb: 2
                                }}>
                                    {/* Gambar produk */}
                                    <CardMedia
                                        sx={{
                                            height: 150, backgroundSize: 'contain', transition: 'transform 0.3s', ":hover": { transform: 'scale(1.1)' },
                                            opacity: product.stock === 0 ? 0.5 : 1
                                        }}
                                        image={`https://localhost:7249/Resources/${product.productImage}`}
                                        title={product.name}
                                    />
                                    <CardContent sx={{
                                        opacity: product.stock === 0 ? 0.5 : 1
                                    }}>
                                        {/* Nama dan stok produk */}
                                        <Typography gutterBottom color='black' variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                            {product.name.length > 15 ? `${product.name.substring(0, 15)}...` : product.name}
                                            <br />
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle2" component="div" sx={{ color: product.stock === 0 ? 'red' : 'grey' }}>
                                            {product.stock === 0 ? 'Stok: Habis' : `Stok: ${product.stock}`}
                                        </Typography>
                                        {/* Harga dan rating produk */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography gutterBottom color='grey' variant="subtitle1" component="div">
                                                {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                            <Typography variant='subtitle1' color='orange'>
                                                <StarIcon sx={{ fontSize: 'large' }} />4.9
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    {/* Tombol untuk melihat detail produk dan dropdown button */}
                                    <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid #eee' }}>
                                        <Button
                                            component={Link}
                                            to={`/detail-produk/${product.id}`}
                                            size="small"
                                            sx={{ color: '#634C9F', textTransform: 'none', fontWeight: 'bold' }}>
                                            Lihat Produk
                                        </Button>
                                        <DropdownButton productId={product.id} stock={product.stock} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
            </Grid>
        </>
    );
}
