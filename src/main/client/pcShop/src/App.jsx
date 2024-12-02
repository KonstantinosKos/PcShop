import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import {Container, CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './themeProvider/theme.js';
import {UserProvider} from "./context/UserContext.jsx";
import Home from "./pages/Home.jsx";
import {About} from "./views/About.jsx";
import {Category} from "./views/Category.jsx";
import {Cart} from "./views/Cart.jsx";
import {Services} from "./views/Services.jsx";
import {Contact} from "./views/Contact.jsx";
import ProductsPage from "./views/ProductsPage.jsx";
import {ProductCard} from "./views/ProductCard.jsx";

function App() {
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Router>
                        <CssBaseline/> {/* Resets CSS to follow Material Design baseline */}
                        <Container>
                            <Routes>
                                <Route path="/" element={<Home/>}>
                                    <Route path="/category" element={<Category/>}/>
                                    <Route path="/category/:category" element={<ProductsPage />} />
                                    <Route path="/category/:category/:productName" element={<ProductCard />} />
                                    <Route path="/cart" element={<Cart/>}/>
                                    <Route path="/services" element={<Services/>}/>
                                    <Route path="/contact-us" element={<Contact/>}/>
                                    <Route path="/about-us" element={<About/>}/>
                                </Route>
                            </Routes>
                        </Container>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </UserProvider>

    );
}

export default App
