import { createTheme } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const LightTheme = createTheme({
  palette: {
    text: {
      primary: '#333333'
    },
    background: {
      default: '#fff'
    },
    primary: {
      main: brown[500],
      dark: brown[700],
      ligt: brown[400],
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat'
  }
});

export default LightTheme;
