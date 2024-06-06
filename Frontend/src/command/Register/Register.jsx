import { useState } from 'react';
import { Box, Button, Container, Paper, Typography, TextField, IconButton, InputAdornment, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HeaderCustomer from '../../components/Header/HeaderCustomer';
import Logo from '../../assets/img/logo1.png';
import Background from '../../assets/img/background-log-reg.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter/PasswordStrengthMeter';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(5, 'Username harus terdiri dari minimal 5 karakter').required('Username harus diisi!'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi!'),
  password: Yup.string()
    .required('Password harus diisi!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      'Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu simbol serta minimal 8 karakter.'
    ),
  phoneNumber: Yup.string().min(10, 'Nomor telepon harus terdiri dari minimal 10 digit').required('Nomor telepon harus diisi!')
});

export default function Register() {
  const [registerError, setRegisterError] = useState('');
  const [password, setPassword] = useState('');  // State untuk password
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);  // State untuk menangani fokus pada password
  const [showPassword, setShowPassword] = useState(false);  // State untuk menangani show/hide password
  const { handleRegisterLogin } = useAuth();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://localhost:7249/api/User/register', {
        userName: values.username,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber
      });

      const token = response.data;

      if (token) {
        handleRegisterLogin(token);
        alert('Registrasi berhasil!');
      } else {
        console.log("Error occurred during registration.");
        alert('Registrasi gagal!');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Terjadi kesalahan saat registrasi.');
    }
  };

  return (
    <>
      <HeaderCustomer />
      <Container
        component={Paper}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fit',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: '7rem', alignSelf: 'flex-start' }} />
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
            padding: '20px',
            width: '50%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Register</Typography>
          <Formik
            initialValues={{ username: '', email: '', password: '', phoneNumber: '' }}
            validationSchema={RegisterSchema} // Set validation schema
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  id="username"
                  name="username"
                  label="Username"
                  placeholder="Username"
                  fullWidth
                  variant="outlined"
                  error={errors.username && touched.username}
                  helperText={errors.username && touched.username ? errors.username : null} // Show error message if touched
                  sx={{ marginBottom: '20px' }}
                />
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
                  helperText={errors.email && touched.email ? errors.email : null} // Show error message if touched
                  sx={{ marginBottom: '20px' }}
                />
                <div style={{ position: 'relative' }}>
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
                    helperText={errors.password && touched.password ? errors.password : null} // Show error message if touched
                    sx={{ marginBottom: '20px' }}
                    onChange={(e) => {
                      handleChange(e);
                      setPassword(e.target.value);  // Update password state
                    }}
                    onFocus={() => setIsPasswordFocused(true)}  // Show PasswordStrengthMeter on focus
                    onBlur={() => setIsPasswordFocused(false)}  // Hide PasswordStrengthMeter on blur
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
                  {isPasswordFocused && <PasswordStrengthMeter password={password} />}  {/* Show PasswordStrengthMeter if focused */}
                </div>
                <Field
                  as={TextField}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  fullWidth
                  variant="outlined"
                  error={errors.phoneNumber && touched.phoneNumber}
                  helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null} // Show error message if touched
                  sx={{ marginBottom: '20px' }}
                />
                {registerError && (
                  <Alert severity="error" sx={{ marginBottom: '20px' }}>
                    {registerError}
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
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            Sudah punya akun? <a href="/login" style={{ color: 'black' }}>Masuk.</a>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
