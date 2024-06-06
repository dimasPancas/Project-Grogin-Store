import axios from "axios";

const BASE_URL = 'https://localhost:7249/api';

{/* === CATEGORY === */ }
const CATEGORY_ADMIN_URL = `${BASE_URL}/Category/admin`;

// Fungsi untuk mengambil data kategori
export const getAdminCategories = async (showActiveCategories, authToken) => {
  try {
    const response = await axios.get(CATEGORY_ADMIN_URL, {
      params: {
        isActive: showActiveCategories,
      },
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
      return [];
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil kategori:", error);
    return [];
  }
};

// Fungsi untuk mengambil kategori berdasarkan ID
export const getAdminCategoryById = async (categoryId, authToken) => {
  try {
    const response = await axios.get(`${CATEGORY_ADMIN_URL}/${categoryId}`, {
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
    console.error("Kesalahan dalam mengambil kategori:", error);
    return null;
  }
};

// Fungsi untuk menambahkan kategori baru
export const addAdminCategory = async (newCategory, authToken) => {
  try {
    const response = await axios.post(CATEGORY_ADMIN_URL, newCategory, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      console.log("Kategori berhasil ditambahkan");
    } else {
      console.error("Gagal menambahkan Kategori");
      return null;
    }
  } catch (error) {
    console.error("Kesalahan dalam menambahkan kategori:", error);
    return null;
  }
};

// Fungsi untuk mengedit kategori yang sudah ada
export const editAdminCategory = async (editedCategoryData, authToken) => {
  try {
    const response = await axios.patch(
      `${CATEGORY_ADMIN_URL}/${editedCategoryData.categoryId}`,
      editedCategoryData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      return editedCategoryData;
    } else {
      console.error("Gagal mengubah kategori. Kode status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Kesalahan dalam mengirim data kategori yang diubah:", error);
    return null;
  }
};

// Fungsi untuk menghapus kategori yang sudah ada
export const deleteAdminCategory = async (categoryId, authToken) => {
  try {
    await axios.delete(`${CATEGORY_ADMIN_URL}/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Kesalahan dalam menghapus kategori:", error);
    return false;
  }
};

// Fungsi untuk mengembalikan kategori yang sudah dihapus
export const restoreAdminCategory = async (categoryId, authToken) => {
  try {
    await axios.patch(`${CATEGORY_ADMIN_URL}/restore/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  } catch (error) {
    console.error("Terjadi kesalahan dalam mengembalikan kategori:", error);
  }
}

{/* === DELIVERY === */ }

{/* === ORDER === */ }

const ORDER_ADMIN_URL = `${BASE_URL}/Order/admin`;

// Fungsi untuk mendapatkan daftar pesanan berdasarkan status
export const getAdminOrders = async (OrderStatus, authToken) => {
  try {
    const response = await axios.get(ORDER_ADMIN_URL, {
      params: { OrderStatus },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = response.data;
    if (responseData && (response.status === 200 || response.status === 201) && responseData.data) {
      return responseData.data;
    } else {
      console.error("Format respons tidak valid:", responseData);
      return [];
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil pesanan:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, newStatus, authToken) => {
  try {
    const response = await axios.patch(`${ORDER_ADMIN_URL}/order-status/${orderId}`, {
      orderId: orderId,
      orderStatus: newStatus
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Kesalahan dalam memperbarui status pesanan:", error);
    return false;
  }
};

// Fungsi lainnya (CATEGORY, DELIVERY, PAYMENT, PRODUCT, USER, VOUCHER) tetap sama seperti yang ada di kode sebelumnya


{/* === PAYMENT === */ }

{/* === PRODUCT === */ }

{/* === USER === */ }

{/* === VOUCHER === */ }

// URL dasar untuk API Voucher
const VOUCHER_ADMIN_URL = `${BASE_URL}/Voucher/admin`;

// Fungsi untuk mendapatkan daftar voucher
export const getAdminVouchers = async (showActiveVouchers, authToken) => {
  try {
    const response = await axios.get(VOUCHER_ADMIN_URL, {
      params: {
        isActive: showActiveVouchers,
      },
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
      return [];
    }
  } catch (error) {
    console.error("Kesalahan dalam mengambil voucher:", error);
    return [];
  }
};

// Fungsi untuk mendapatkan satu voucher berdasarkan ID
export const getAdminVoucherById = async (voucherId, authToken) => {
  try {
    const response = await axios.get(`${VOUCHER_ADMIN_URL}/${voucherId}`, {
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
    console.error("Kesalahan dalam mengambil voucher:", error);
    return null;
  }
};

// Fungsi untuk menambahkan voucher baru
export const addAdminVoucher = async (newVoucher, authToken) => {
  try {
    const response = await axios.post(VOUCHER_ADMIN_URL, newVoucher, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200 || response.status === 201) {
      console.log("Voucher berhasil ditambahkan");
    } else {
      console.error("Gagal menambahkan Voucher");
      return null;
    }
  } catch (error) {
    console.error("Kesalahan dalam menambahkan voucher:", error);
    return null;
  }
};

// Fungsi untuk mengedit voucher yang sudah ada
export const editAdminVoucher = async (editedVoucherData, authToken) => {
  try {
    const response = await axios.patch(
      `${VOUCHER_ADMIN_URL}/${editedVoucherData.voucherId}`,
      editedVoucherData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      return editedVoucherData;
    } else {
      console.error("Gagal mengubah voucher. Kode status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Kesalahan dalam mengirim data voucher yang diubah:", error);
    return null;
  }
};

// Fungsi untuk menghapus voucher yang sudah ada
export const deleteAdminVoucher = async (voucherId, authToken) => {
  try {
    await axios.delete(`${VOUCHER_ADMIN_URL}/${voucherId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Kesalahan dalam menghapus voucher:", error);
    return false;
  }
};