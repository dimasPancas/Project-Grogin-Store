import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.given_name);
      setUserRole(decodedToken.role);
    }
  }, [authToken]);

  const handleLogin = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.given_name);
    setUserRole(decodedToken.role);

    // if (token != null && decodedToken.role === 'Admin') {
    //   window.location.href = '/admin';
    // } else {
    //   window.location.href = '/';
    // }
  };

  const handleRegisterLogin = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.given_name);
    setUserRole(decodedToken.role);

    window.location.href = '/detail-alamat';
  };

  const handleLogout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    setUsername(null);
    setUserRole(null);
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, authToken, userRole, handleLogin, handleRegisterLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
