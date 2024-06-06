import { useState, useEffect } from "react";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Box, Paper, Button } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import CheckoutSummary from './CheckoutSummary';
import { useNavigate } from 'react-router-dom';
import { getCustomerVouchers, getCustomerAddresses, getCustomerDeliveries, getCustomerPayments, createCustomerOrder } from "../../../services/api/customerApi";
import AddVoucherModal from "./AddVoucherModal";

export default function CheckoutDetails() {
  const [addressOptions, setAddressOptions] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [freeShippingVouchers, setFreeShippingVouchers] = useState([]);
  const [discountVouchers, setDiscountVouchers] = useState([]);
  const [selectedFreeShippingVoucher, setSelectedFreeShippingVoucher] = useState(null);
  const [selectedDiscountVoucher, setSelectedDiscountVoucher] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherType, setVoucherType] = useState("");
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      if (!selectedAddress || !selectedDelivery || !selectedPayment) {
        console.error("Silakan pilih alamat, jasa pengiriman, dan metode pembayaran.");
        return;
      }

      const orderData = {
        paymentId: selectedPayment.id,
        addresId: selectedAddress.id,
        deliveryId: selectedDelivery.id,
        voucherFreeShippingId: selectedFreeShippingVoucher?.id || null,
        voucherDiscountId: selectedDiscountVoucher?.id || null
      };

      const response = await createCustomerOrder(orderData, authToken);
      if (response.status === 200) {
        navigate('/histori-pesanan');
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat pesanan:", error);
    }
  };

  const handleOnChange = (value, setterFunction) => {
    setterFunction(value);
  };

  const handleOpenVoucherModal = (type) => {
    setVoucherType(type);
    setShowVoucherModal(true);
  };

  const handleSelectVoucher = (voucher) => {
    if (voucherType === 'freeShipping') {
      setSelectedFreeShippingVoucher(voucher);
    } else if (voucherType === 'discount') {
      setSelectedDiscountVoucher(voucher);
    }
    setShowVoucherModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addresses, deliveries, payments, voucherData] = await Promise.all([
          getCustomerAddresses(authToken),
          getCustomerDeliveries(authToken),
          getCustomerPayments(authToken),
          getCustomerVouchers(authToken)
        ]);

        setAddressOptions(addresses);
        setDeliveryOptions(deliveries);
        setPaymentOptions(payments);

        if (voucherData) {
          const { freeShipping, voucherPercentage, voucherDiscount } = voucherData;

          setFreeShippingVouchers(freeShipping || []);

          const combinedVouchers = [
            ...(voucherPercentage || []),
            ...(voucherDiscount || [])
          ];
          setDiscountVouchers(combinedVouchers);
        } else {
          console.log("Data voucher tidak ditemukan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };

    if (authToken != null) {
      fetchData();
    }
  }, [authToken]);

  return (
    <Box component={Paper} elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5">Detail Pengiriman</Typography>
          <Grid container spacing={2}>
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
        <Grid item xs={4}>
          <Typography variant="h5">Pilih Voucher</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Voucher Gratis Ongkir</Typography>
              <Button 
                variant="outlined" 
                onClick={() => handleOpenVoucherModal('freeShipping')}
                fullWidth
              >
                {selectedFreeShippingVoucher ? selectedFreeShippingVoucher.name : 'Pilih Voucher Gratis Ongkir'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Voucher Diskon</Typography>
              <Button 
                variant="outlined" 
                onClick={() => handleOpenVoucherModal('discount')}
                fullWidth
              >
                {selectedDiscountVoucher ? selectedDiscountVoucher.name : 'Pilih Voucher Diskon'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* Tampilan ringkasan checkout */}
          <CheckoutSummary
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
        vouchers={voucherType === 'freeShipping' ? freeShippingVouchers : discountVouchers}
        onSelectVoucher={handleSelectVoucher}
      />
    </Box>
  );
}
