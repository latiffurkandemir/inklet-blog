import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f8f9fa',
    },
    secondary: {
      main: '#000814',
    },
    accent: {
      main: '#003566',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000814',
    },
    secondary: {
      main: '#f8f9fa',
    },
    accent: {
      main: '#003566',
    },
  },
});

export { lightTheme, darkTheme };
