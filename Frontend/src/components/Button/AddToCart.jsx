import axios from 'axios';

export const AddToCart = async (productId, authToken) => {
  try {
    // Melakukan POST request untuk menambahkan item ke keranjang
    const response = await axios.post(
      'https://localhost:7249/api/Cart',
      { productId, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const responseData = response.data;
    if (responseData.status === 201) {
      // Jika item berhasil ditambahkan ke keranjang
      // console.log('Item berhasil ditambahkan ke keranjang');
    } else {
      // Jika terjadi kesalahan saat menambahkan item ke keranjang
      throw new Error(responseData.message || 'Gagal menambahkan item ke keranjang');
    }
  } catch (error) {
    // Tangani kesalahan yang terjadi selama proses penambahan item ke keranjang
    console.error('Gagal menambahkan item ke keranjang:', error);
    throw new Error('Gagal menambahkan item ke keranjang.');
  }
};
