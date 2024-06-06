import { Container, Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import ProductCardFilter from "./ProductCardFilter";

export default function CatalogFilter() {
  const [products, setProducts] = useState([]);

  const apiProductsUrl = "https://localhost:7249/api/Product";

  useEffect(() => {
    axios
      .get(apiProductsUrl)
      .then((response) => {
        console.log("products :", response.data.$values);
        setProducts(response.data.$values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container component={Paper}
        maxWidth="lg"
        sx={{ bgcolor: '#fafafa', borderRadius: 3 }}>
        <Grid>
          <ProductCardFilter products={products.category} category='Product Serupa' />
        </Grid>
      </Container>
    </>
  )
}
