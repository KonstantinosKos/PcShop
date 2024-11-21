import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import {Container, CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './themeProvider/theme.js';
import {UserProvider} from "./context/UserContext.jsx";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Router>
                        <CssBaseline/> {/* Resets CSS to follow Material Design baseline */}
                        <Container
                        >
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/about"/>
                            </Routes>
                        </Container>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </UserProvider>

    )
        ;
}

export default App
