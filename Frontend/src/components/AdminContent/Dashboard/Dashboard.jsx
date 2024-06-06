import { Box, Grid, Typography } from "@mui/material";
import OrderTable from './OrderTableDashboard';
import RemainStock from "./RemainStockDashboard";
import OrderStatistic from "./OrderStatistic";
import GrossRevenueStatistic from "./GrossRevenueStatistic";
import SoldProduct from './SoldProduct';

export default function DashboardAdmin() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <GrossRevenueStatistic />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <OrderStatistic />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SoldProduct />
                </Grid>
            </Grid>
            <Box mt={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Pesanan Terbaru</Typography>
                        <OrderTable />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Stok Tersisa</Typography>
                        <RemainStock />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
