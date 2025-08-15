// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ffffffff' },
    secondary: { main: '#000000ff' },
    background: { default: '#ffffffff' },
    textPrimary: '#000000ff',
    textSecondary: '#d1d1d1ff',
    textAccent: '#0081C7',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '3rem' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212' },
    textPrimary: '#000000ff',
    textSecondary: '#0081C7',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '3rem' },
  },
});
