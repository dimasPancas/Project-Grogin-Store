{/* Fungsi untuk mendapatkan tanggal rentang untuk minggu ini */ }
export function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // Menentukan hari ini dalam seminggu (0-6, di mana 0 adalah Minggu)

  // Hitung awal minggu saat ini (Senin)
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setHours(0, 0, 0, 0); // Mengatur waktu ke tengah malam untuk memastikan perhitungan yang konsisten
  currentWeekStart.setDate(currentDate.getDate() - currentDayOfWeek + 1); // Menyesuaikan untuk offset zona waktu

  // Hitung akhir minggu saat ini (Minggu)
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Menyesuaikan untuk offset zona waktu

  return { start: currentWeekStart, end: currentWeekEnd };
}

{/* Fungsi untuk mendapatkan rentang tanggal minggu sebelumnya */ }
export function getPreviousWeekDates() {
  const { start: currentWeekStart } = getCurrentWeekDates();

  // Hitung awal minggu sebelumnya
  const previousWeekStart = new Date(currentWeekStart);
  previousWeekStart.setDate(previousWeekStart.getDate() - 7); // Menyesuaikan untuk offset zona waktu

  // Hitung akhir minggu sebelumnya
  const previousWeekEnd = new Date(previousWeekStart);
  previousWeekEnd.setDate(previousWeekEnd.getDate() + 6); // Menyesuaikan untuk offset zona waktu

  return { start: previousWeekStart, end: previousWeekEnd };
}
