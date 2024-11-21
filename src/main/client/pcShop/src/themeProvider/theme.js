import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#9c27b0', // Purple
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: 'rgba(98,110,159,0.65)', // Use background.default color
                },
            },
        },
    },
});

