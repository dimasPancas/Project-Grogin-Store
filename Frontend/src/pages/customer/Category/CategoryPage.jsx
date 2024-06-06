// eslint-disable react/prop-types
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, CardActions, Tabs, Tab,  Container } from '@mui/material';
import DropdownButton from '../../../components/Button/DropdownButton';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from '../../../components/Skeleton/ProductCardSkeleton';
import { getAllCategories, getProductByParams } from '../../../services/api/customerApi';
import emptyProductImage from '../../../assets/img/empty_products.png';

export default function CategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
        const queryParams = getQueryParams(location.search);
        const categoryId = queryParams.get('category');
        setSelectedCategory(categoryId || (categories.length > 0 ? categories[0].id : null));
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setIsLoading(true);
      try {
        const params = {
          PageNumber: 1, // Sesuaikan dengan kebutuhan Anda
          PageSize: 10, // Sesuaikan dengan kebutuhan Anda
          CategoryId: selectedCategory,
          // tambahkan parameter lain jika diperlukan
        };
        const products = await getProductByParams(params);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    navigate(`/kategori?category=${newValue}`);
    setSelectedCategory(newValue);
  };

  const getCategoryName = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'Produk Kategori';
  };

  return (
    <Container sx={{ bgcolor: '#fafafa', borderRadius: 3 }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '200px', borderRight: 1, borderColor: 'divider' }}>
          <Tabs
            orientation="vertical"
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {categories.map((category) => (
              <Tab key={category.id} label={category.name} value={category.id} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {getCategoryName()}
          </Typography>
          <Grid container spacing={2}>
            {isLoading
              ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <ProductCardSkeleton />
                </Grid>
              )) : products.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ textAlign: 'center', width: '80%' }}>
                    <img src={emptyProductImage} alt="Empty Products" style={{ width: '100px', marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }} />
                    <Typography variant="subtitle1" sx={{ color: 'grey', maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                      Maaf, tidak ada produk yang tersedia untuk kategori <strong>{getCategoryName()}</strong> saat ini.
                    </Typography>
                  </Box>
                </Box>
              ) : products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
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
        </Box>
      </Box>
    </Container>
  );
}
