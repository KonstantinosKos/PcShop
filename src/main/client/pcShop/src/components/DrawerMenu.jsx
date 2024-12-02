// import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";
import DrawerHeader from "./DrawerHeader.jsx";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({open}) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme)
                },
            },
            {
                props: ({open}) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme)
                },
            },
        ]
    }),
);

const DrawerMenu = ({handleDrawerClose, open}) => {

    const navigate  = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        window.location.reload();
    }

    const icons = [
        <DevicesOtherIcon/>,
        <ShoppingCartIcon/>,
        <ElectricalServicesIcon/>,
        <ContactMailIcon/>,
        <InfoIcon/>
    ];

    const handleDrawerOptions = (e) => {
        switch (e) {
            case 0: navigate(`/category`); break;
            case 1: navigate("/cart"); break;
            case 2: navigate('/services'); break;
            case 3: navigate('/contact-us'); break;
            case 4: navigate('/about-us'); break;
            default: navigate("/");
        }
    }

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader handleDrawerClose={handleDrawerClose}/>
            <Divider/>
            <List>
                {['Products', 'Cart', 'Services', 'Community', 'About us'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={[{
                                minHeight: 48,
                                px: 2.5,
                            }, open ? {
                                    justifyContent: 'initial',
                                }
                                : {
                                    justifyContent: 'center',
                                },
                            ]}
                            onClick={() => handleDrawerOptions(index)}
                        >
                            <ListItemIcon
                                sx={[{
                                    minWidth: 0,
                                    justifyContent: 'center',
                                },
                                    open ? {
                                        mr: 3,
                                    } : {
                                        mr: 'auto',
                                    },]}
                            >
                                {icons[index]}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={[
                                    open ? {
                                        opacity: 1,
                                    } : {
                                        opacity: 0,
                                    },
                                ]}
                            />
                        </ListItemButton>
                        <Divider/>
                    </ListItem>
                ))}
            </List>
            <List sx={{
                mt: 'auto',
                padding: '0'
            }}>
                <Divider/>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton
                        sx={[{
                            minHeight: 48,
                            px: 2.5,
                        }, open ? {
                                justifyContent: 'initial',
                            }
                            : {
                                justifyContent: 'center',
                            },
                        ]}
                        onClick={handleLogout}
                    >
                        <ListItemIcon
                            sx={[{
                                minWidth: 0,
                                justifyContent: 'center',
                            },
                                open ? {
                                    mr: 3,
                                } : {
                                    mr: 'auto',
                                },]}
                        >
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={"Logout"}
                            sx={[
                                open ? {
                                    opacity: 1,
                                } : {
                                    opacity: 0,
                                },
                            ]}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default DrawerMenu;
