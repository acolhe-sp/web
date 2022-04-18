import { createTheme } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: brown[500],
      dark: brown[700],
      ligt: brown[400],
      contrastText: '#fff',
    },
  }
});