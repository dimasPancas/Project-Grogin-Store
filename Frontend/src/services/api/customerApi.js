import axios from 'axios';

const BASE_URL = 'https://localhost:7249/api';

{/* === ADDRESS === */ }
const ADDRESS_BASE_URL = `${BASE_URL}/Address`;

export const getCustomerAddresses = async (authToken) => {
  try {
    const response = await axios.get(ADDRESS_BASE_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data alamat:", error);
    throw error;
  }
};

{/* === CATEGORY === */ }
const CATEGORY_BASE_URL = `${BASE_URL}/Category`;

export const getAllCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_BASE_URL);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error('Failed to fetch categories');
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

{/* === DELIVERY === */ }
const DELIVERY_BASE_URL = `${BASE_URL}/Delivery`;

export const getCustomerDeliveries = async (authToken) => {
  try {
    const response = await axios.get(DELIVERY_BASE_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data jasa pengiriman:", error);
    throw error;
  }
};

{/* === ORDER === */ }
const ORDER_BASE_URL = `${BASE_URL}/Order`;

export const getAllCustomerOrders = async (authToken) => {
  try {
    const response = await axios.get(`${ORDER_BASE_URL}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
};

// Funsgi checkout dari cartpage
export const createCustomerOrder = async (orderData, authToken) => {
  try {
    let url = `${ORDER_BASE_URL}/order-cart`;

    // Menentukan URL berdasarkan voucher yang dipilih
    if (orderData.voucherFreeShippingId && orderData.voucherDiscountId) {
      url += `?voucherFreeShippingId=${orderData.voucherFreeShippingId}&voucherDiscountId=${orderData.voucherDiscountId}`;
    } else if (orderData.voucherFreeShippingId) {
      url += `?voucherFreeShippingId=${orderData.voucherFreeShippingId}`;
    } else if (orderData.voucherDiscountId) {
      url += `?voucherDiscountId=${orderData.voucherDiscountId}`;
    }

    const response = await axios.post(url, orderData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat pesanan:", error);
    throw error;
  }
};

// Fungsi checkout dari buynowpage
export const createCustomerOrderFromBuyNow = async (orderData, authToken) => {
  try {
    let url = `${ORDER_BASE_URL}/order-cart`;

    // Menentukan URL berdasarkan voucher yang dipilih
    if (orderData.voucherFreeShippingId && orderData.voucherDiscountId) {
      url += `?voucherFreeShippingId=${orderData.voucherFreeShippingId}&voucherDiscountId=${orderData.voucherDiscountId}`;
    } else if (orderData.voucherFreeShippingId) {
      url += `?voucherFreeShippingId=${orderData.voucherFreeShippingId}`;
    } else if (orderData.voucherDiscountId) {
      url += `?voucherDiscountId=${orderData.voucherDiscountId}`;
    }

    const response = await axios.post(url, orderData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat pesanan dari Buy Now Page:", error);
    throw error;
  }
};

// Fungsi untuk mengambil detail pesanan dari API
export const getOrderDetails = async (id, authToken, setOrder) => {
  try {
    const response = await axios.get(`${ORDER_BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    setOrder(response.data.data[0]);
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
};

{/* === PAYMENT === */ }
const PAYMENT_BASE_URL = `${BASE_URL}/Payment`;

export const getCustomerPayments = async (authToken) => {
  try {
    const response = await axios.get(PAYMENT_BASE_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data metode pembayaran:", error);
    throw error;
  }
};

{/* === PRODUCT === */ }
const PRODUCT_BASE_URL = `${BASE_URL}/Product`;

// Fungsi untuk mendapatkan detail produk berdasarkan ID
export const getProductById = async (id, authToken) => {
  try {
    const response = await axios.get(`${PRODUCT_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product details by ID:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data produk berdasarkan category
export const getProductFilter = async (categoryId) => {
  try {
    const response = await axios.get(PRODUCT_BASE_URL, {
      params: {
        PageNumber: 1,
        PageSize: 6,
        CategoryId: categoryId,
      },
    });
    return response.data.data.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductByParams = async (params) => {
  try {
    const response = await axios.get(PRODUCT_BASE_URL, { params });
    return response.data.data.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

{/* === VOUCHER === */ }
const VOUCHER_BASE_URL = `${BASE_URL}/Voucher`;

export const getCustomerVouchers = async (authToken) => {
  try {
    const response = await axios.get(VOUCHER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = response.data;
    if (
      responseData &&
      (response.status === 200 || response.status === 201) &&
      responseData.data
    ) {
      const { freeShipping, voucherPercentage, voucherDiscount } = responseData.data;

      console.log("Voucher Gratis Ongkir:");
      console.log(freeShipping);

      console.log("Voucher Persentase dan Diskon:");
      if (Array.isArray(voucherPercentage)) {
        console.log(voucherPercentage);
      } else {
        console.log("Voucher Persentase tidak tersedia");
      }

      if (Array.isArray(voucherDiscount)) {
        console.log(voucherDiscount);
      } else {
        console.log("Voucher Diskon tidak tersedia");
      }

      return { freeShipping, voucherPercentage, voucherDiscount };
    } else {
      console.error("Format respons tidak valid:", responseData);
      return { freeShipping: [], voucherPercentage: [], voucherDiscount: [] };
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil voucher customer:", error);
    return { freeShipping: [], voucherPercentage: [], voucherDiscount: [] };
  }
};

export const getAvailableVouchers = async (authToken) => {
  try {
    const response = await axios.get(`${VOUCHER_BASE_URL}/available`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData = response.data;

    if (responseData && responseData.status === 200 && responseData.data) {
      const { freeShipping, voucherPercentage, voucherDiscount } = responseData.data;

      console.log("Voucher Gratis Ongkir:");
      console.log(freeShipping);

      console.log("Voucher Persentase dan Diskon:");
      const combinedVouchers = [...voucherPercentage, ...voucherDiscount];
      console.log(combinedVouchers);

      return { freeShipping, combinedVouchers };
    } else {
      console.error("Format respons tidak valid:", responseData);
      return { freeShipping: [], combinedVouchers: [] };
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil voucher yang tersedia:", error);
    return { freeShipping: [], combinedVouchers: [] };
  }
};

export const getAvailableVoucherById = async (voucherId, authToken) => {
  try {
    const response = await axios.get(`${VOUCHER_BASE_URL}/${voucherId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = response.data;
    if (
      responseData &&
      (response.status === 200 || response.status === 201) &&
      responseData.data
    ) {
      return responseData.data;
    } else {
      console.error("Format respons tidak valid:", responseData);
      return null;
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil voucher berdasarkan ID:", error);
    return null;
  }
};

export const claimVoucher = async (voucherId, authToken) => {
  try {
    const response = await axios.post(
      `${VOUCHER_BASE_URL}/claim/${voucherId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengklaim voucher:", error);
    throw error;
  }
};

{/* === WISHLIST === */ }
const WISHLIST_BASE_URL = `${BASE_URL}/Wishlist`;

export const getWishlistItems = async (authToken) => {
  try {
    const response = await axios.get(WISHLIST_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
};

export const deleteWishlistItem = async (itemId, authToken) => {
  try {
    await axios.delete(`${WISHLIST_BASE_URL}/${itemId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    throw error;
  }
};
