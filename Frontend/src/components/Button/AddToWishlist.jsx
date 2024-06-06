import axios from 'axios';

export const addToWishlist = async (productId, authToken) => {
  try {
    // Lakukan permintaan API untuk mendapatkan item-item wishlist saat ini
    const wishlistResponse = await axios.get('https://localhost:7249/api/Wishlist', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const wishlistItems = wishlistResponse.data.data;

    // Periksa apakah produk sudah ada dalam wishlist
    const isProductInWishlist = wishlistItems.some(item => item.productId === productId);
    if (isProductInWishlist) {
      // console.log('Produk sudah ada dalam wishlist.');
      return { success: false, message: 'Produk sudah ada dalam wishlist' };
    }

    // Jika produk belum ada dalam wishlist, tambahkan
    const response = await axios.post(
      'https://localhost:7249/api/Wishlist',
      { productId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      // console.log('Item berhasil ditambahkan ke wishlist');
      return { success: true, message: 'Item berhasil ditambahkan ke wishlist' };
    } else {
      throw new Error('Gagal menambahkan item ke wishlist');
    }
  } catch (error) {
    console.error('Gagal menambahkan item ke wishlist:', error);
    return { success: false, message: 'Gagal menambahkan item ke wishlist' };
  }
};
