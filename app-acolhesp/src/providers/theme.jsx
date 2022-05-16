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
        },
        {
          props: { variant: 'follow' },
          style: {
            backgroundColor: '#e98838ad',
            color: 'white',
            height: '40px',
            borderRadius: '5px',
            ":hover": {
              backgroundColor: '#b35d18c4',
            }
          },
        }
      ]
    },
    MuiInputBase: {
      variants: [
        {
          props: { variant: 'descricao-perfil' },
          style: {
            marginTop: '5px',
            width: '50vw',
            color: '#7e7e7ead',
            fontSize: '20px',
            fontWeight: 'bold'
          },
        },
        {
          props: { variant: 'descricao-publi' },
          style: {
            marginTop: '5px',
            width: '36vw',
            color: 'black',
            fontSize: '16px',
          },
        },
        {
          props: { variant: 'local' },
          style: {
            backgroundColor: 'transparent',
            color: '#7e7e7ead',
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
      ]
    }
  }
});

export default LightTheme;
