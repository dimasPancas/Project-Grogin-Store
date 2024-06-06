import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Box, Typography, Button, List, TextField, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CartIllustration from '../../assets/img/illustration-2.png';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './AddressDetails.css';

const AddressSchema = Yup.object().shape({
  street: Yup.string().required('Alamat lengkap harus diisi'),
  village: Yup.string().required('Kelurahan harus diisi'),
  city: Yup.string().required('Kota/Kab. harus diisi'),
  province: Yup.string().required('Provinsi harus diisi'),
  postalCode: Yup.number().required('Kode Pos harus diisi').typeError('Kode Pos harus berupa angka')
});

export default function AddressDetails() {
  const [provinces, setProvinces] = useState([]);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://localhost:7249/api/Province");
        if (response.status === 200) {
          setProvinces(response.data.data);
        } else {
          console.error("Gagal mengambil data provinsi: ", response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi: ", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("https://localhost:7249/api/Address", values, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        console.log("Alamat berhasil disimpan!");
        navigate("/");
      } else {
        console.error("Gagal menyimpan alamat: ", response.data);
      }
    } catch (error) {
      console.error("Gagal menyimpan alamat: ", error);
    }
  };

  return (
    <>
      <Container sx={{ bgcolor: '#fafafa', borderRadius: 2 }} className="container">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Paper elevation={3} className="left-grid">
              <Box p={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Tambahkan detail alamat Anda</Typography>
                <Formik
                  initialValues={{
                    street: "",
                    village: "",
                    city: "",
                    province: "",
                    postalCode: ""
                  }}
                  validationSchema={AddressSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        id="street"
                        type="text"
                        name="street"
                        label="Alamat lengkap"
                        variant="outlined"
                        size="normal"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={errors.street && touched.street}
                        helperText={errors.street && touched.street ? errors.street : ""}
                      />
                      <Field
                        as={TextField}
                        id="province"
                        select
                        name="province"
                        label="Provinsi"
                        variant="outlined"
                        size="normal"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={errors.province && touched.province}
                        helperText={errors.province && touched.province ? errors.province : ""}
                      >
                        {provinces.map((provinsi) => (
                          <MenuItem key={provinsi.id} value={provinsi.name}>
                            {provinsi.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <Field
                        as={TextField}
                        id="city"
                        type="text"
                        name="city"
                        label="Kota/Kab."
                        variant="outlined"
                        size="normal"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={errors.city && touched.city}
                        helperText={errors.city && touched.city ? errors.city : ""}
                      />
                      <Field
                        as={TextField}
                        id="village"
                        type="text"
                        name="village"
                        label="Kelurahan"
                        variant="outlined"
                        size="normal"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={errors.village && touched.village}
                        helperText={errors.village && touched.village ? errors.village : ""}
                      />
                      <Field
                        as={TextField}
                        id="postalCode"
                        type="number"
                        name="postalCode"
                        label="Kode Pos"
                        variant="outlined"
                        size="normal"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={errors.postalCode && touched.postalCode}
                        helperText={errors.postalCode && touched.postalCode ? errors.postalCode : ""}
                      />
                      <List style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          component={NavLink}
                          to="/"
                          key="/"
                          className='log-btn'
                          variant='outlined'
                          sx={{
                            color: '#634C9F',
                            mr: 1,
                            borderColor: '#634C9F',
                            borderRadius: 1,
                            textTransform: "none",
                            fontFamily: 'Tahoma',
                            fontWeight: 'bold'
                          }}>Lewati</Button>
                        <Button
                          className='reg-btn'
                          variant='contained'
                          sx={{
                            backgroundColor: '#634C9F',
                            borderRadius: 1,
                            textTransform: "none",
                            fontFamily: 'Tahoma',
                            fontWeight: 'bold'
                          }}
                          type="submit"
                        >Simpan</Button>
                      </List>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6} >
            <Box p={3}>
              <img src={CartIllustration} alt="img" className="img" />
              <Typography variant="h6" className="description" style={{ fontWeight: 'bold', textAlign: 'center' }}>Selangkah lagi menjadi member kami dan dapatkan berbagai benefit pada setiap transaksi</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
