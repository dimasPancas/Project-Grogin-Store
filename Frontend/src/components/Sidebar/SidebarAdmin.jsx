/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Grid } from '@mui/material';

const Sidebar = ({ onApply }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
  });
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.name);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleApply = () => {
    const searchParams = {
      search: searchQuery,
      filters: Object.keys(filters).filter(key => filters[key]),
      sortBy: sortBy,
      sortDirection: sortDirection,
    };
    onApply(searchParams);
  };

  return (
    <Box sx={{ width: '250px', padding: '20px', backgroundColor: '#f8f8f8', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ height: '50px' }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Filters:</Typography> */}
          <FormControlLabel
            control={<Checkbox checked={filters.filter1} onChange={handleFilterChange} name="filter1" />}
            label="Filter 1"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.filter2} onChange={handleFilterChange} name="filter2" />}
            label="Filter 2"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.filter3} onChange={handleFilterChange} name="filter3" />}
            label="Filter 3"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Sorting:</Typography> */}
          <FormControlLabel
            control={<Checkbox checked={sortBy === 'priceLowToHigh'} onChange={handleSortChange} name="priceLowToHigh" />}
            label="Price: Low to High"
          />
          <FormControlLabel
            control={<Checkbox checked={sortBy === 'priceHighToLow'} onChange={handleSortChange} name="priceHighToLow" />}
            label="Price: High to Low"
          />
          <FormControlLabel
            control={<Checkbox checked={sortBy === 'nameAZ'} onChange={handleSortChange} name="nameAZ" />}
            label="Name: A to Z"
          />
          <FormControlLabel
            control={<Checkbox checked={sortBy === 'nameZA'} onChange={handleSortChange} name="nameZA" />}
            label="Name: Z to A"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Sort Direction:</Typography> */}
          <FormControlLabel
            control={<Checkbox checked={sortDirection === 0} onChange={handleSortDirectionChange} name="sortDirection0" />}
            label="Ascending"
          />
          <FormControlLabel
            control={<Checkbox checked={sortDirection === 1} onChange={handleSortDirectionChange} name="sortDirection1" />}
            label="Descending"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleApply} sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;