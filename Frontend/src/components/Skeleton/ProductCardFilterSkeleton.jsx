import { Skeleton, Box, Button, Typography, Grid } from '@mui/material';

export default function ProductCardFilterSkeleton() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <Skeleton variant="text" width={100} />
        </Typography>
        <Button variant="contained" size="small">
          <Skeleton variant="text" width={100} />
        </Button>
      </Box>
      <Grid container spacing={1}>
        {[1, 2, 3, 4, 5, 6].map((index) => ( // Placeholder for 6 product cards
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Skeleton variant="rectangular" width={250} height={400} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}