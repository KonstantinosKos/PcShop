import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LoginSignupDialog from "../dialogs/LoginSignupDialog.jsx";
import AppBar from "../components/AppBar.jsx";
import DrawerMenu from "../components/DrawerMenu.jsx";
import DrawerHeader from "../components/DrawerHeader.jsx";
import {Outlet} from "react-router-dom";


export default function Home() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <LoginSignupDialog/>
            <CssBaseline/>
            <AppBar
                position="fixed"
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <DrawerMenu
                variant="permanent"
                open={open}
                handleDrawerClose={handleDrawerClose}
            />

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Typography sx={{marginBottom: 2}}>
                    {/*my future content*/}
                </Typography>
                <Outlet/>
            </Box>
        </Box>
    );
}
