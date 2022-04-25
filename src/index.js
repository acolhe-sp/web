import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import LightTheme from './providers/theme';
import App from './App';


ReactDOM.render(
  <ThemeProvider theme={LightTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
document.getElementById('root')  
);
