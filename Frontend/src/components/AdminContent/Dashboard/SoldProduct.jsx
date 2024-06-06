import { Card, Divider, Grid, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function OrderStatistic({ currentWeekOrderCount, orderChangePercentage }) {
  return (
    <Grid item xs={12}>
      <Card sx={{ p: 2, borderRadius: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Produk Terjual
          </Typography>
        </div >
        <Divider />
        <Typography variant='h4' sx={{ marginBottom: 1, fontWeight: 'bold' }}>
          308
        </Typography>
        <Typography variant='body1' sx={{ fontStyle: 'italic', display: 'flex' }}>
          <ArrowDropDownIcon sx={{ color: '#ff0000' }} />
          -7% dari minggu lalu
        </Typography>
      </Card>
    </Grid>
  );
}
