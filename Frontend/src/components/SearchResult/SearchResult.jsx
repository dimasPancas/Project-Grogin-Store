/* eslint-disable react/prop-types */
import { MenuItem, Paper, MenuList, Box, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';

function SearchResult({ searchResults }) {
  if (!searchResults || searchResults.length === 0) {
    return null; // Tidak menampilkan apa-apa jika tidak ada hasil
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 1, my: 1, maxHeight: 400, overflowY: 'auto' }}>
      <MenuList>
        {searchResults.map((product, index) => (
          <MenuItem key={index} component={NavLink} to={`/detail-produk/${product.id}`}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={`https://localhost:7249/Resources/${product.productImage}`} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{`${product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}</Typography>
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default SearchResult;
