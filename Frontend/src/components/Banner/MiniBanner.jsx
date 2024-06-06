import { Grid, Typography } from "@mui/material";
import Banner from "./Banner";

export default function MiniBanner() {
  return (
    <>
      <Typography variant="h6">MiniBanner</Typography>
      <Grid xs={4}>
        <Banner />
      </Grid>
      <Grid xs={4}>
        <Banner />
      </Grid>
      <Grid xs={4}>
        <Banner />
      </Grid>
    </>
  )
}
