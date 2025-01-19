import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import useUser from "../customHook/useUser.jsx";
import {useNavigate} from "react-router-dom";
import useCart from "../customHook/useCart.jsx";

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {setSessionUser} = useUser();
    const navigate = useNavigate();
    const {clearCart} = useCart();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        clearCart();
        setSessionUser({username: '', password: '', id: ''});
        sessionStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    }

    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                sx={{width: 30, height: 30, position: 'fixed', right: 30, top: 15}}
                onClick={handleClick}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Stack>
    );
}

export default Profile;