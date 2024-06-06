export const calculateItemSubtotal = (item) => {
  return item.price * item.quantity;
};

export const calculateTotalAmount = (items, deliveryCost, paymentCost, freeShippingVoucher, discountVoucher) => {
  let subtotal = 0;
  console.log("item nih bos", items)

  items.forEach(item => {
    subtotal += calculateItemSubtotal(item);
  });

  const parsedDeliveryCost = parseFloat(deliveryCost || 0);
  const parsedPaymentCost = parseFloat(paymentCost || 0);

  // Log untuk memastikan nilai yang dihasilkan benar
  console.log('Subtotal:', subtotal);
  console.log('Parsed Delivery Cost:', parsedDeliveryCost);
  console.log('Parsed Payment Cost:', parsedPaymentCost);

  // Mengatur biaya pengiriman berdasarkan voucher gratis ongkir
  const adjustedDeliveryCost = freeShippingVoucher ? 0 : (isNaN(parsedDeliveryCost) ? 0 : parsedDeliveryCost);
  console.log('Adjusted Delivery Cost:', adjustedDeliveryCost);

  // Menghitung total sebelum diskon
  let totalBeforeDiscount = subtotal + adjustedDeliveryCost + (isNaN(parsedPaymentCost) ? 0 : parsedPaymentCost);
  console.log('Total Before Discount:', totalBeforeDiscount);

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
  console.log('Discount Amount:', discountAmount);

  // Pastikan total tidak menjadi negatif dan menetapkan batas minimal
  const minimumTotal = 100; // Minimal transaksi sebesar Rp 1.000,00
  const total = Math.max(totalBeforeDiscount - discountAmount, minimumTotal);
  console.log('Total:', total);

  return {
    total,
    totalBeforeDiscount,
    discountAmount
  };
};
