import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Profile from "../fragments/Profile.jsx";
import SearchBar from "./SearchBar.jsx";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const drawerWidth = 240;

const Bar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({open}) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const AppBar = ({open, handleDrawerOpen}) => {
    const navigate = useNavigate();
     const handleClick = () => {
         navigate('/');
     }
    return (
        <Bar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        {
                            marginRight: 5,
                        },
                        open && {display: 'none'},
                    ]}
                >
                    <MenuIcon/>
                </IconButton>
                <Box
                    component="div"
                    onClick={handleClick}
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        '&:hover': {
                            color: 'rgba(241,241,246,0.65)',
                        },
                    }}
                >
                    PcShop
                </Box>
                <SearchBar />
                <Profile/>
            </Toolbar>
        </Bar>
    )
}

export default AppBar;