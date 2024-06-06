import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Avatar, Button, TextField, Collapse, Divider, Paper, ButtonGroup, Grid } from '@mui/material';
import EditAddress from './EditAddress';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../redux/slices/snackbarSlice';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    UserName: '',
    PhoneNumber: '',
    ProfilePicture: null
  });
  const { authToken } = useAuth();
  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('https://localhost:7249/api/User/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'accept': '*/*'
        }
      });
      setUserProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal memuat profil pengguna', type: 'error' }));
    }
  };

  useEffect(() => {
    if (authToken != null) {
      fetchUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleEditProfile = () => {
    setEditMode(true);
    setFormData({
      Email: userProfile.email,
      UserName: userProfile.userName,
      PhoneNumber: userProfile.phoneNumber,
      ProfilePicture: null
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      Email: userProfile.email,
      UserName: userProfile.userName,
      PhoneNumber: userProfile.phoneNumber,
      ProfilePicture: null
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Email', formData.Email);
      formDataToSend.append('UserName', formData.UserName);
      formDataToSend.append('PhoneNumber', formData.PhoneNumber);

      if (formData.ProfilePicture) {
        formDataToSend.append('ProfilePicture', formData.ProfilePicture);
      }

      const response = await axios.patch(
        'https://localhost:7249/api/User',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Profile updated successfully:', response.data);
      dispatch(showSnackbar({ title: 'Success', message: 'Profil berhasil diperbarui', type: 'success' }));
      fetchUserProfile();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      dispatch(showSnackbar({ title: 'Error', message: 'Gagal memperbarui profil', type: 'error' }));
    }
  };

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            alt={userProfile.userName}
            src={userProfile.userProfile ? `https://localhost:7249/Resources/${userProfile.userProfile}` : null}
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              boxShadow: 3,
              marginRight: 2
            }}
          >
            {!userProfile.userProfile && userProfile.userName.charAt(0)}
          </Avatar>
          <Typography variant="h4">
            {userProfile.userName}
          </Typography>
        </Box>
        <Box>
          {!editMode ? (
            <>
              <Paper sx={{ p: 2 }}>
                <Typography variant='h6'>Profil Pengguna</Typography>
                <TextField
                  variant='outlined'
                  label="Email"
                  value={userProfile.email}
                  disabled
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant='outlined'
                  label="Username"
                  value={userProfile.userName}
                  disabled
                  fullWidth
                  margin="normal"
                />
                <TextField
                  variant='outlined'
                  label="Nomor Telepon"
                  value={userProfile.phoneNumber}
                  disabled
                  fullWidth
                  margin="normal"
                />

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleEditProfile}
                      color="primary"
                      sx={{ mt: 1 }}
                    >
                      Edit Profil
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

            </>
          ) : (
            <Collapse in={editMode}>
              <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
                <Typography variant="h6">Edit Profil</Typography>
                <TextField
                  name="Email"
                  label="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="UserName"
                  label="Username"
                  value={formData.UserName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="PhoneNumber"
                  label="Nomor Telepon"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => setFormData({ ...formData, ProfilePicture: e.target.files[0] })}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    sx={{ mt: 1 }}
                  >
                    Ganti Foto Profil
                  </Button>
                </label>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancelEdit}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Simpan
                    </Button>
                  </ButtonGroup>
                </Box>
              </Paper>
            </Collapse>
          )}

          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
      <EditAddress />
    </>
  );
}
