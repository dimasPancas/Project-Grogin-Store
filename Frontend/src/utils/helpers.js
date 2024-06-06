{/* Fungsi untuk mengatur format tanggal */ }
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};