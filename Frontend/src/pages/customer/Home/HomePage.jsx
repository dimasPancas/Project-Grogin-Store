import { Container, Grid } from '@mui/material';
import Banner from "../../../components/Banner/Banner";
import Catalog from "../../../components/Product/Catalog";
import SidebarCustomer from "../../../components/Sidebar/SidebarCustomer";


export default function HomePage() {
  return (
    <div>
      <Container sx={{ bgcolor: '#fafafa', p: 1, mt: 1, borderRadius: 3 }}>
        <Grid container spacing={15}>
          <Grid item xs={12} sm={3}>
            <SidebarCustomer />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Banner />
          </Grid>
        </Grid>
      </Container>
      <br />
      <Catalog />
    </div>
  )
}
