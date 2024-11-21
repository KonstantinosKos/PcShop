import React, {forwardRef, useEffect, useMemo, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {login, signup} from "../handlers/user.js";
import useUser from "../customHook/useUser.jsx";
import {useSnackbar} from "notistack";
import MyTextField from "../components/fields/MyTextField.jsx";
import MyPasswordField from "../components/fields/MyPasswordField.jsx";
import Box from "@mui/material/Box";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginSignupDialog() {
    const [open, setOpen] = useState(true);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const {setSessionUser, sessionUser} = useUser();
    const {enqueueSnackbar} = useSnackbar();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: {
            city: '',
            street: '',
            number: '',
            zipCode: ''
        },
        creditCard: {
            nameOnCard: '',
            numberOnCard: '',
            cardExpireDate: '',
            cardType: '',
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    const toggleDialogType = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = () => {
        console.log(isLogin);
        if (isLogin) {
            login(sessionUser.username, sessionUser.password)
                .then(response => handleNotification(response.data, response.statusCode))
                .catch((error) => {
                    console.log(error);
                    enqueueSnackbar('Server error!', {variant: 'error'});
                });
        } else {
            console.log(isLogin);
            signup(user)
                .then(response => handleNotificationOnCreation(response.data, response.statusCode))
                .catch((error) => {
                    console.log(error);
                    enqueueSnackbar('Server error!', {variant: 'error'});
                });
        }

    };

    const handleNotification = (data, statusCode) => {
        if (statusCode === 200) {
            setSessionUser(data);
            sessionStorage.setItem('user', JSON.stringify(sessionUser));
            setOpen(false);
            handleClose();
            enqueueSnackbar('Welcome ' + sessionUser.username, {variant: 'success'});
        } else {
            console.log("Server error!");
            enqueueSnackbar('Server error!', {variant: 'error'});
        }
    }

    const handleNotificationOnCreation = (data, statusCode) => {
        if (statusCode === 201) {
            setSessionUser(data.username, data.password);
            enqueueSnackbar('Welcome ' + user.username, {variant: 'success'});
        }
    }

    useEffect(() => {
        if (sessionUser.username !== '') {
            setOpen(false);
        }
    }, [setSessionUser]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSessionUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUp = (e) => {
        const {name, value} = e.target;
        console.log(name);
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddress = (e) => {
        const {name, value} = e.target;
        setUser((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    }
    const handleConfirmPassword = (e) => {
        const {name, value} = e.target;
        setConfirmPassword(value);
    }

    const passwordConfirmed = useMemo(() => {
        return confirmPassword === user.password;
    }, [user.password, confirmPassword]);

    return (
        <Dialog
            TransitionComponent={Transition}
            open={open}
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                },
            }}>
            <DialogTitle>{isLogin ? 'Login to Your Account' : 'Create a New Account'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isLogin
                        ? 'Enter your credentials to access your account.'
                        : 'Fill in the details below to create a new account.'}
                </DialogContentText>
                {isLogin && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <MyTextField
                            required
                            autoFocus={true}
                            label="Username"
                            type="text"
                            name="username"
                            value={sessionUser.username}
                            onChange={handleChange}
                        />
                        <MyPasswordField
                            label="Password"
                            type="password"
                            name="password"
                            value={sessionUser.password}
                            onChange={handleChange}
                        />
                    </Box>
                )}
                {!isLogin && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <MyTextField
                            required
                            label={"Username"}
                            type={"text"}
                            name="username"
                            value={user.username}
                            onChange={handleSignUp}
                        />
                        <MyPasswordField
                            required
                            error={!passwordConfirmed}
                            label="Password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleSignUp}
                        />
                        <MyPasswordField
                            required
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                        />
                    </Box>)}
                {!isLogin && (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        gap: 2,
                    }}>
                        <MyTextField
                            required
                            label={"First Name"}
                            type={"text"}
                            name="firstName"
                            value={user.firstName}
                            onChange={handleSignUp}
                        />
                        <MyTextField
                            required
                            label={"Last Name"}
                            type={"text"}
                            name="lastName"
                            value={user.lastName}
                            onChange={handleSignUp}
                        />
                        <MyTextField
                            required
                            label={"Phone Number"}
                            type={"text"}
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleSignUp}
                        />
                        <MyTextField
                            required
                            label={"Email"}
                            type={"email"}
                            name="email"
                            value={user.email}
                            onChange={handleSignUp}
                        />
                    </Box>
                )}
                {!isLogin && (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        gap: 2,
                    }}>
                        <MyTextField
                            label={"City"}
                            type={"text"}
                            name="city"
                            value={user.address.city}
                            onChange={handleAddress}
                        />
                        <MyTextField
                            label={"Street"}
                            type={"text"}
                            name="street"
                            value={user.address.street}
                            onChange={handleAddress}
                        />
                        <MyTextField
                            label={"Number"}
                            type={"text"}
                            name="number"
                            value={user.address.number}
                            onChange={handleAddress}
                        />
                        <MyTextField
                            label={"Zip Code"}
                            type={"text"}
                            name="zipCode"
                            value={user.address.zipCode}
                            onChange={handleAddress}
                        />

                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialogType}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </Button>
                <Button onClick={handleLogin} color="primary">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
