import { useState, useEffect } from 'react';
import { Box, Button, Container, Paper, Typography, TextField, IconButton, InputAdornment, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderCustomer from '../../components/Header/HeaderCustomer';
import Logo from '../../assets/img/logo1.png';
import Background from '../../assets/img/background-log-reg.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string()
    .required('Password harus diisi')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      'Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu simbol serta minimal 8 karakter'
    )
});

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk menangani show/hide password
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, userRole, navigate]);

  const handleLoginSubmit = async (values) => {
    try {
      const response = await axios.post('https://localhost:7249/api/User/login', {
        email: values.email,
        password: values.password
      });

      const token = response.data;
      if (token) {
        handleLogin(token);
        setIsLoggedIn(true);
        setUserRole('Admin'); // Assuming user role is 'Admin' upon successful login
      } else {
        setLoginError('Kesalahan terjadi saat login.');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      setLoginError('Terjadi kesalahan saat login.');
    }
  };

  return (
    <>
      <HeaderCustomer />
      <Typography variant="h6">Login</Typography>
      <Container
        component={Paper}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundColor: '#fafafa',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fit',
          backgroundPosition: 'center',
          opacity: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: '7rem', marginBottom: '20px', alignSelf: 'flex-start' }} />
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '7px',
            padding: '20px',
            width: '50%',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', justifyContent: 'center' }}>Login</Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  fullWidth
                  variant="outlined"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : null}
                  sx={{ mb: 1 }}
                />
                <Field
                  as={TextField}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  fullWidth
                  variant="outlined"
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password ? errors.password : null}
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {loginError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {loginError}
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: '#634C9F',
                    borderRadius: 7,
                    textTransform: "none",
                    fontFamily: 'Tahoma',
                    fontWeight: 'bold'
                  }}
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            Belum punya akun? Daftar <a href="/register" style={{ color: 'black' }}>disini.</a>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
