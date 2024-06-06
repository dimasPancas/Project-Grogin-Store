import { useState, useEffect } from "react";
import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";
import axios from "axios";

export default function RemainStock() {
  const apiProductsUrl = "https://localhost:7249/api/Product/admin/?PageNumber=1&PageSize=5";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiProductsUrl);
      const responseData = response.data;
      if (responseData && responseData.status === 200 && responseData.data) {
        setProducts(responseData.data.items);
      } else {
        console.error("Invalid response format:", responseData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <Box component={Paper}>
        <TableContainer sx={{ borderRadius: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#634C9F', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopLeftRadius: '7px' }}>Nama Produk</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopRightRadius: '7px' }}>Jumlah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
