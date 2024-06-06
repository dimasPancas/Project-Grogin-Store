import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCECSS, SET_USER } from '../types/authActionTypes';
import { jwtDecode } from 'jwt-decode';

export const loginSuccess = (token) => {
  const decodedToken = jwtDecode(token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      username: decodedToken.given_name,
      role: decodedToken.role,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const setUser = (token) => {
  const decodedToken = jwtDecode(token);
  return {
    type: SET_USER,
    payload: {
      token,
      username: decodedToken.given_name,
      role: decodedToken.role,
    }
  }
}


