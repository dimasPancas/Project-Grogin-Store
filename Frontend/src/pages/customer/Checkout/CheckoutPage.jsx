import { Container } from "@mui/material";
import CheckoutDetails from "./CheckoutDetails";

export default function CheckoutPage() {

  return (
    <Container sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: '#fafafa' }}>
      <CheckoutDetails />
    </Container>
  );
}
