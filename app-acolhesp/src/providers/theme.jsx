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
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'navbar' },
          style: {
            backgroundColor: '#FFF',
            color: 'black',
            border: '1px solid silver',
            borderRadius: '5px',
            ":hover": {
              backgroundColor: 'silver',
            }
          },
        }
      ]
    }
  }
});

export default LightTheme;
