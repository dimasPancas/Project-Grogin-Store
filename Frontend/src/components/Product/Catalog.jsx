import { Container, Paper } from "@mui/material";
import { useCategories } from "../../contexts/CategoryContext";
import ProductCardFilter from "./ProductCardFilter";
import ProductCard from "./ProductCard";
import { useSelector } from 'react-redux';

export default function Catalog() {
  const { categories } = useCategories();
  const filters = useSelector((state) => state.productFilters);

  // Cek apakah ada filter yang diterapkan
  const isFilterApplied = filters.search || filters.sortBy || filters.sortDirection || filters.categoryId;

  return (
    <>
      {isFilterApplied ? (
        <Container component={Paper} maxWidth="lg" sx={{ bgcolor: '#fafafa', borderRadius: 3 }}>
          <ProductCard
            key="all-products"
            categoryName="Hasil Filter:"
            search={filters.search}
            sort={filters.sortBy}
            sortDirection={filters.sortDirection}
            pageNumber={filters.pageNumber}
            pageSize={1000}
            categoryId={filters.categoryId}
          />
        </Container>
      ) : (
        <Container component={Paper} maxWidth="lg" sx={{ bgcolor: '#fafafa', borderRadius: 3 }}>
          {categories.map((category) => (
            <ProductCardFilter key={category.id} categoryName={category.name} categoryId={category.id} />
          ))}
        </Container>
      )}
    </>
  );
}
