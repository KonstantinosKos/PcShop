import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import useUser from "../customHook/useUser.jsx";

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {setSessionUser} = useUser();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setSessionUser({username: '', password: ''});
        sessionStorage.removeItem('user');
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
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Stack>
    );
}

export default Profile;