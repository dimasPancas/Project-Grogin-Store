import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1000,
    color: 'black',
    backgroundColor: '#FAFAFA',
    borderRadius: 3,
  },
  logo: {
    marginRight: theme.spacing(1),
    width: '5rem',
  },
  midLinksListItem: {
    color: '#634C9F',
    fontWeight: 'bold',
    fontFamily: 'Tahoma',
    display: 'flex',
    '&.active': {
      color: 'black',
    },
    '&:hover': {
      color: 'white',
      backgroundColor: '#634C9F',
      border: 'white',
      borderRadius: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  userIconsBadge: {
    marginRight: theme.spacing(1),
    borderRadius: 7,
    textTransform: 'none',
    fontFamily: 'Time',
    fontWeight: 'bold',
  },
  username: {
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    color: 'black',
  },
  authButton: {
    color: '#634C9F',
    borderColor: '#634C9F',
    borderRadius: 7,
    textTransform: 'none',
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  registerButton: {
    backgroundColor: '#634C9F',
    borderRadius: 7,
    textTransform: 'none',
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
  },
}));

export default useStyles;
