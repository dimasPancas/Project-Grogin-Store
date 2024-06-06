import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedAdminRoute = ({ element }) => {
  const { isLoggedIn, authToken } = useAuth();

  // Periksa apakah pengguna masuk dan peran pengguna adalah 'admin'
  if (!isLoggedIn || (authToken && jwtDecode(authToken).role !== 'Admin')) {
    // Jika tidak, arahkan pengguna ke halaman yang sesuai
    return <Navigate to="/" replace />;
  }

  // Jika pengguna telah masuk dan memiliki peran 'admin', lanjutkan menampilkan elemen yang dilindungi
  return <Route element={element} />;
};

export default ProtectedAdminRoute;