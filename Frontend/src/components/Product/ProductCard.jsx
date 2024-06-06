/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import DropdownButton from '../Button/DropdownButton';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import { getProductByParams } from '../../services/api/customerApi';

export default function ProductCard({ categoryName, categoryId, sort = '', sortDirection = '', pageNumber = 1, pageSize = 1000, search }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const params = {
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                    ...(categoryId && { CategoryId: categoryId }),
                    ...(search && { Search: search }), // Hanya terapkan pencarian jika ada
                    ...(sort && { SortBy: sort }),
                    ...(sortDirection && { SortDirection: sortDirection }),
                };
                const products = await getProductByParams(params);
                setProducts(products);
            } catch (error) {
                console.error('Error mengambil produk:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, search, sort, pageNumber, pageSize, sortDirection]); // Tambahkan search sebagai dependensi

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1 }}>{categoryName}</Typography>
            </Box>
            <Grid container spacing={2}>
                {isLoading
                    ? Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                            <ProductCardSkeleton />
                        </Grid>
                    ))
                    : products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                            <Card sx={{
                                borderRadius: 3,
                                ":hover": { boxShadow: '0px 0px 3px 3px #634C9F' },
                                mb: 2
                            }}>
                                <CardMedia
                                    sx={{
                                        height: 150, backgroundSize: 'contain', transition: 'transform 0.3s', ":hover": { transform: 'scale(1.1)' },
                                        opacity: product.stock === 0 ? 0.5 : 1
                                    }}
                                    image={`https://localhost:7249/Resources/${product.productImage}`}
                                    title={product.name}
                                />
                                <CardContent sx={{ opacity: product.stock === 0 ? 0.5 : 1 }}>
                                    <Typography gutterBottom color='black' variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                        {product.name.length > 15 ? `${product.name.substring(0, 15)}...` : product.name}
                                        <br />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="div" sx={{ color: product.stock === 0 ? 'red' : 'grey' }}>
                                        {product.stock === 0 ? 'Stok: Habis' : `Stok: ${product.stock}`}
                                    </Typography>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography gutterBottom color='grey' variant="subtitle1" component="div">
                                            {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                        </Typography>
                                        <Typography variant='subtitle1' color='orange'>
                                            <StarIcon sx={{ fontSize: 'large' }} />4.9
                                        </Typography>
                                    </div>
                                </CardContent>
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
                    ))}
            </Grid>
        </>
    );
}
