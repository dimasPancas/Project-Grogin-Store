/* eslint-disable react/prop-types */
import zxcvbn from 'zxcvbn';
import { LinearProgress, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CheckCircle, Cancel, TextFields, FormatSize, Numbers, Straighten, LooksOne } from '@mui/icons-material';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const passwordCriteria = [
    { label: 'Minimal 8 karakter', regex: /.{8,}/, icon: <Straighten /> },
    { label: 'Huruf besar', regex: /[A-Z]/, icon: <TextFields /> },
    { label: 'Huruf kecil', regex: /[a-z]/, icon: <FormatSize /> },
    { label: 'Angka', regex: /\d/, icon: <LooksOne /> },
    { label: 'Simbol', regex: /[!@#$%^&*(),.?":{}|<>]/, icon: <Numbers /> }
  ];

  // Cek apakah password memenuhi semua kriteria dan memiliki panjang >= 12 karakter
  const isStrongPassword = password.length >= 12 || passwordCriteria.every(criteria => criteria.regex.test(password));

  const createPasswordLabel = () => {
    if (isStrongPassword) {
      return { label: 'Sangat kuat', color: 'success' };
    }
    switch (testResult.score) {
      case 0:
        return { label: 'Sangat lemah', color: 'error' };
      case 1:
        return { label: 'Lemah', color: 'error' };
      case 2:
        return { label: 'Cukup kuat', color: 'warning' };
      case 3:
        return { label: 'Kuat', color: 'success' };
      case 4:
        return { label: 'Sangat kuat', color: 'success' };
      default:
        return { label: 'Sangat lemah', color: 'error' };
    }
  };

  return (
    <div style={{ position: 'absolute', top: 'calc(90%)', left: 0, width: '100%', zIndex: 10, backgroundColor: 'white', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', padding: '10px' }}>
      <LinearProgress variant="determinate" color={createPasswordLabel().color} value={num} />
      <Typography sx={{ mt: 1, fontSize: '0.8rem', textAlign: 'left' }}>Kekuatan password: {createPasswordLabel().label}</Typography>
      <Box>
        <List sx={{ fontSize: '0.7rem' }}>
          {passwordCriteria.map((criteria, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {criteria.icon}
              </ListItemIcon>
              <ListItemText primary={criteria.label} />
              <ListItemIcon>
                {criteria.regex.test(password) ? (
                  <CheckCircle color="success" />
                ) : (
                  <Cancel color="error" />
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default PasswordStrengthMeter;
