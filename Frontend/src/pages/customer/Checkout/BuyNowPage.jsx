// Import modul React dan MUI untuk pembuatan komponen
import { useState, useEffect } from "react";
import { Typography, Box, Paper, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthContext";
import { getCustomerAddresses, getCustomerDeliveries, getCustomerPayments, createCustomerOrderFromBuyNow, getCustomerVouchers } from '../../../services/api/customerApi';
import BuyNowSummary from "./BuyNowSummary";
import AddVoucherModal from "../../../components/Voucher/AddVoucherModal";

// Komponen utama halaman BuyNow
export default function BuyNowPage() {
  const { id: productId } = useParams(); // Mendapatkan productId dari URL params
  const [addressOptions, setAddressOptions] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedFreeShippingVoucher, setSelectedFreeShippingVoucher] = useState(null);
  const [selectedDiscountVoucher, setSelectedDiscountVoucher] = useState(null);
  const [quantity, setQuantity] = useState(1); // State untuk mengelola jumlah produk
  const { authToken } = useAuth();
  const [showVoucherModal, setShowVoucherModal] = useState(false); // State untuk mengelola tampilan modal voucher
  const [freeShippingVouchers, setFreeShippingVouchers] = useState([]);
  const [discountVouchers, setDiscountVouchers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Fungsi untuk menangani pembuatan pesanan
  const handleOrder = async () => {
    try {
      if (!selectedAddress || !selectedDelivery || !selectedPayment) {
        console.error("Silakan pilih alamat, jasa pengiriman, dan metode pembayaran.");
        return;
      }

      // Simpan informasi produk yang dipilih
      const selectedProductData = {
        productId: productId,
        quantity: quantity,
      };
      setSelectedProduct(selectedProductData);

      const orderData = {
        productId: productId,
        quantity: quantity,
        paymentId: selectedPayment.id,
        addresId: selectedAddress.id,
        deliveryId: selectedDelivery.id,
        voucherFreeShippingId: selectedFreeShippingVoucher?.id || null,
        voucherDiscountId: selectedDiscountVoucher?.id || null
      };

      const response = await createCustomerOrderFromBuyNow(orderData, authToken);
      if (response.status === 200) {
        navigate('/histori-pesanan');
      }
    } catch (error) {
      console.error("Error saat membuat pesanan:", error);
    }
  };

  // Fungsi untuk menangani perubahan nilai state
  const handleOnChange = (value, setterFunction) => {
    setterFunction(value);
  };

  // UseEffect untuk mengambil data alamat, pengiriman, pembayaran, dan voucher
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await getCustomerAddresses(authToken);
        setAddressOptions(addresses);
      } catch (error) {
        console.error("Error saat mengambil data alamat:", error);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const deliveries = await getCustomerDeliveries(authToken);
        setDeliveryOptions(deliveries);
      } catch (error) {
        console.error("Error saat mengambil data jasa pengiriman:", error);
      }
    };

    const fetchPayments = async () => {
      try {
        const payments = await getCustomerPayments(authToken);
        setPaymentOptions(payments);
      } catch (error) {
        console.error("Error saat mengambil data metode pembayaran:", error);
      }
    };

    const fetchVouchers = async () => {
      try {
        const voucherData = await getCustomerVouchers(authToken);

        if (voucherData) {
          const { freeShipping, voucherPercentage, voucherDiscount } = voucherData;

          // Set state untuk voucher gratis ongkir
          setFreeShippingVouchers(freeShipping || []);

          // Gabungkan voucher persentase dan diskon menjadi satu array dan set state
          const combinedVouchers = [
            ...(voucherPercentage || []),
            ...(voucherDiscount || [])
          ];
          setDiscountVouchers(combinedVouchers);
        } else {
          console.log("Data voucher tidak ditemukan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data voucher:", error);
      }
    };

    if (authToken != null) {
      fetchAddresses();
      fetchDeliveries();
      fetchPayments();
      fetchVouchers();
    }
  }, [authToken]);

  // Render halaman BuyNow
  return (
    <Container>
      <Box component={Paper} elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Bagian Detail Pengiriman */}
          <Grid item xs={8}>
            <Typography variant="h5">Detail Pengiriman</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Masukkan jumlah produk</Typography>
                <TextField
                  fullWidth
                  label="Jumlah"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Pilih Alamat</Typography>
                <FormControl fullWidth>
                  <InputLabel id="address-label">Alamat</InputLabel>
                  <Select
                    labelId="address-label"
                    id="address"
                    label="Alamat"
                    value={selectedAddress}
                    onChange={(e) => handleOnChange(e.target.value, setSelectedAddress)}
                    fullWidth
                  >
                    {addressOptions.length > 0 ? (
                      addressOptions.map((address) => (
                        <MenuItem key={address.id} value={address}>
                          {`${address.province}, ${address.city}, ${address.village}, ${address.street}, ${address.postalCode}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        onClick={() => navigate('/detail-alamat')}
                      >
                        Tidak ada alamat ditemukan, tambahkan alamat baru
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => navigate('/detail-alamat')}
                    >
                      Tambahkan alamat baru
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Pilih Jasa Pengiriman</Typography>
                <FormControl fullWidth>
                  <InputLabel id="delivery-label">Jasa Pengiriman</InputLabel>
                  <Select
                    labelId="delivery-label"
                    id="delivery"
                    label="Jasa Pengiriman"
                    value={selectedDelivery}
                    onChange={(e) => handleOnChange(e.target.value, setSelectedDelivery)}
                    fullWidth
                  >
                    {deliveryOptions.length > 0 ? (
                      deliveryOptions.map((delivery) => (
                        <MenuItem key={delivery.id} value={delivery}>
                          {`${delivery.name} - ${delivery.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Memuat pilihan pengiriman...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Pilih Metode Pembayaran</Typography>
                <FormControl fullWidth>
                  <InputLabel id="payment-label">Metode Pembayaran</InputLabel>
                  <Select
                    labelId="payment-label"
                    id="payment"
                    label="Metode Pembayaran"
                    value={selectedPayment}
                    onChange={(e) => handleOnChange(e.target.value, setSelectedPayment)}
                    fullWidth
                  >
                    {paymentOptions.length > 0 ? (
                      paymentOptions.map((payment) => (
                        <MenuItem key={payment.id} value={payment}>
                          {`${payment.name}, biaya layanan ${payment.paymentCost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Memuat pilihan pembayaran...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {/* Bagian Pilih Voucher */}
          <Grid item xs={4}>
            <Typography variant="h5">Pilih Voucher</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Voucher Gratis Ongkir</Typography>
                <FormControl fullWidth>
                  <InputLabel id="free-shipping-voucher-label">Voucher Gratis Ongkir</InputLabel>
                  <Select
                    labelId="free-shipping-voucher-label"
                    id="free-shipping-voucher"
                    label="Voucher Gratis Ongkir"
                    value={selectedFreeShippingVoucher || ''}
                    onChange={(e) => setSelectedFreeShippingVoucher(e.target.value)}
                    fullWidth
                  >
                    {freeShippingVouchers.length > 0 ? (
                      freeShippingVouchers.map((voucher) => (
                        <MenuItem key={voucher.id} value={voucher}>
                          {voucher.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Tidak ada voucher gratis ongkir yang tersedia</MenuItem>
                    )}
                    <MenuItem onClick={() => setShowVoucherModal(true)}>Tambahkan Voucher</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Voucher Diskon</Typography>
                <FormControl fullWidth>
                  <InputLabel id="discount-voucher-label">Voucher Diskon</InputLabel>
                  <Select
                    labelId="discount-voucher-label"
                    id="discount-voucher"
                    label="Voucher Diskon"
                    value={selectedDiscountVoucher || ''}
                    onChange={(e) => setSelectedDiscountVoucher(e.target.value)}
                    fullWidth
                  >
                    {discountVouchers.length > 0 ? (
                      discountVouchers.map((voucher) => (
                        <MenuItem key={voucher.id} value={voucher}>
                          {voucher.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Tidak ada voucher diskon yang tersedia</MenuItem>
                    )}
                    <MenuItem onClick={() => setShowVoucherModal(true)}>Tambahkan Voucher</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* Tampilan ringkasan checkout */}
            <BuyNowSummary
              productId={productId}
              quantity={quantity}
              selectedProduct={selectedProduct}
              deliveryCost={selectedDelivery.price}
              paymentCost={selectedPayment.paymentCost}
              freeShippingVoucher={selectedFreeShippingVoucher}
              discountVoucher={selectedDiscountVoucher}
            />
          </Grid>
        </Grid>
        {/* Tombol untuk membuat pesanan */}
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ color: 'white', ml: 2 }}
            onClick={handleOrder}
            disabled={!selectedAddress || !selectedDelivery || !selectedPayment}
          >
            Buat Pesanan
          </Button>
        </Box>
        {/* Modal untuk memilih voucher */}
        <AddVoucherModal
          open={showVoucherModal}
          onClose={() => setShowVoucherModal(false)}
          vouchers={[...freeShippingVouchers, ...discountVouchers]}
          onSelectVoucher={voucher => {
            if (voucher.type === 'freeShipping') {
              setSelectedFreeShippingVoucher(voucher);
            } else {
              setSelectedDiscountVoucher(voucher);
            }
          }}
        />
      </Box>
    </Container>
  );
}

