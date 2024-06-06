import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { hideSnackbar } from '../../redux/slices/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
});

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <MuiSnackbar
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={snackbarState.type}>
        {snackbarState.title && <AlertTitle>{snackbarState.title}</AlertTitle>}
        {snackbarState.message}
      </Alert>
    </MuiSnackbar>
  )
}