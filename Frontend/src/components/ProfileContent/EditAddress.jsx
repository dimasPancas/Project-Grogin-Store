import { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../redux/slices/snackbarSlice';

export default function EditAddress() {
  const { authToken } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [village, setVillage] = useState('');
  const [street, setStreet] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken != null) {
      fetchAddresses();
      fetchProvinces();
    }
  }, [authToken]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('https://localhost:7249/api/Address', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.status === 200) {
        setAddresses(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedAddress(response.data.data[0].id);
          populateForm(response.data.data[0]);
        }
      } else {
        console.error('Failed to fetch addresses:', response.data.message);
        dispatch(showSnackbar({ title: 'Error', message: 'Gagal memuat alamat', type: 'error' }));
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memuat alamat', type: 'error' }));
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://localhost:7249/api/Province', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': '*/*'
        }
      });
      if (response.data.status === 200) {
        setProvinces(response.data.data);
      } else {
        console.error('Failed to fetch provinces:', response.data.message);
        dispatch(showSnackbar({ title: 'Error', message: 'Gagal memuat provinsi', type: 'error' }));
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memuat provinsi', type: 'error' }));
    }
  };

  const handleAddressChange = (event) => {
    const selectedAddressId = event.target.value;
    const address = addresses.find(addr => addr.id === selectedAddressId);
    setSelectedAddress(selectedAddressId);
    if (address) {
      populateForm(address);
      setProvince(address.province || '');
    }
  };

  const populateForm = (address) => {
    setProvince(address.province || '');
    setCity(address.city || '');
    setPostalCode(address.postalCode || '');
    setVillage(address.village || '');
    setStreet(address.street || '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAddress = {
        id: selectedAddress,
        province,
        city,
        postalCode,
        village,
        street
      };

      const response = await axios.patch(`https://localhost:7249/api/Address/${selectedAddress}`, updatedAddress, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Address updated successfully:', response.data);
        dispatch(showSnackbar({ title: 'Success', message: 'Alamat berhasil diperbarui', type: 'success' }));
      } else {
        console.error('Failed to update address:', response.data.message);
        dispatch(showSnackbar({ title: 'Error', message: 'Gagal memperbarui alamat', type: 'error' }));
      }
    } catch (error) {
      console.error('Error updating address:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Kesalahan saat memperbarui alamat', type: 'error' }));
    }
  };

  return (
    <>
      <Typography variant="h6">Edit Address</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Address</InputLabel>
              <Select
                value={selectedAddress}
                onChange={handleAddressChange}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Pilih Alamat
                </MenuItem>
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <MenuItem key={address.id} value={address.id}>
                      {`${address.province}, ${address.city}, ${address.village}, ${address.street}, ${address.postalCode}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    onClick={() => navigate('/detail-alamat')}
                  >
                    Tidak ada alamat ditemukan, tambahkan alamat baru.
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => navigate('/detail-alamat')}
                >
                  Tambahkan alamat baru
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Province</InputLabel>
              <Select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Pilih Provinsi
                </MenuItem>
                {provinces.length > 0 ? (
                  provinces.map((province) => (
                    <MenuItem key={province.id} value={province.name}>
                      {province.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Memuat provinsi...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Village" value={village} onChange={(e) => setVillage(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Street" value={street} onChange={(e) => setStreet(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
