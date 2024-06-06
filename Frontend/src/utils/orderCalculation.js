export const calculateItemSubtotal = (item) => {
  return item.productPrice * item.quantity;
};

export const calculateTotalAmount = (cartItems, deliveryCost, paymentCost, freeShippingVoucher, discountVoucher) => {
  let subtotal = 0;

  cartItems.forEach(item => {
    subtotal += calculateItemSubtotal(item);
  });

  const parsedDeliveryCost = parseFloat(deliveryCost);
  const parsedPaymentCost = parseFloat(paymentCost);

  // Mengatur biaya pengiriman berdasarkan voucher gratis ongkir
  const adjustedDeliveryCost = freeShippingVoucher ? 0 : (isNaN(parsedDeliveryCost) ? 0 : parsedDeliveryCost);

  // Menghitung total sebelum diskon
  let totalBeforeDiscount = subtotal + adjustedDeliveryCost + (isNaN(parsedPaymentCost) ? 0 : parsedPaymentCost);

  // Mengatur diskon berdasarkan voucher diskon
  let discountAmount = 0;
  if (discountVoucher) {
    if (discountVoucher.discountValue) {
      // Menggunakan diskon persentase
      discountAmount = totalBeforeDiscount * (discountVoucher.discountValue / 100);
      if (discountVoucher.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, discountVoucher.maxDiscountAmount);
      }
    } else if (discountVoucher.maxDiscountAmount) {
      // Menggunakan diskon nominal
      discountAmount = discountVoucher.maxDiscountAmount;
    }
  }

  // Pastikan total tidak menjadi negatif dan menetapkan batas minimal
  const minimumTotal = 100; // Minimal transaksi sebesar Rp 1.000,00
  const total = Math.max(totalBeforeDiscount - discountAmount, minimumTotal);

  return {
    total,
    totalBeforeDiscount,
    discountAmount
  };
};
