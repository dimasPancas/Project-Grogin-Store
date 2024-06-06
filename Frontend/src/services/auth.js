import { jwtDecode } from "jwt-decode";

export const getAuthToken = () => {
  return localStorage.getItem('token'); // Mengambil token dari localStorage
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token); // Menyimpan token di localStorage
};

export const removeAuthToken = () => {
  localStorage.removeItem('token'); // Menghapus token dari localStorage
};

export const decodeAuthToken = (token) => {
  return jwtDecode(token); // Mendekode token JWT
};
