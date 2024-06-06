import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { setFilters } from '../../redux/slices/productFiltersSlice';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/api/customerApi';

const SidebarCustomer = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.productFilters);
  const navigate = useNavigate();

  const [localFilters, setLocalFilters] = useState({
    ...filters,
    CategoryIds: filters?.CategoryIds || [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setLocalFilters({ ...localFilters, categoryId: event.target.value });
  };

  const handleSortChange = (event) => {
    const { value, checked } = event.target;
    const newSortBy = checked ? value : '';
    setLocalFilters({ ...localFilters, sortBy: newSortBy });
  };

  const handleSortDirectionChange = (event) => {
    setLocalFilters({ ...localFilters, sortDirection: event.target.value });
  };

  const handleApply = () => {
    dispatch(setFilters(localFilters));
    const queryString = new URLSearchParams(localFilters).toString();
    navigate(`?${queryString}`);
  };

  return (
    <Box sx={{
      width: { xs: '100%', sm: '250px' },
      padding: '20px',
      backgroundColor: '#f8f8f8',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Grid container spacing={2} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="category-select-label">Kategori</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={localFilters.categoryId}
              onChange={handleCategoryChange}
              label="Kategori"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Typography variant='body2'>Urutkan berdasarkan:</Typography>
            <FormControlLabel
              control={<Checkbox value="name" checked={localFilters.sortBy === "name"} onChange={handleSortChange} />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  Nama
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox value="price" checked={localFilters.sortBy === "price"} onChange={handleSortChange} />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  Harga
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox value="createdDate" checked={localFilters.sortBy === "createdDate"} onChange={handleSortChange} />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  Produk Terbaru
                </Typography>
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Typography variant='body2'>Arah urutan:</Typography>
            <FormControlLabel
              control={<Checkbox value="0" checked={localFilters.sortDirection === "0"} onChange={handleSortDirectionChange} />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  Naik
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox value="1" checked={localFilters.sortDirection === "1"} onChange={handleSortDirectionChange} />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  Turun
                </Typography>
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleApply} sx={{
            backgroundColor: '#634C9F',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            fontSize: '16px',
          }}>
            Terapkan
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SidebarCustomer;
