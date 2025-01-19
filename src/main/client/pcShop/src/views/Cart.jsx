import React from 'react';
import {Box, Button, Divider, Paper, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EuroIcon from "@mui/icons-material/Euro";
import useCart from "../customHook/useCart.jsx";
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const {cartItems, removeItem, clearCart, totalPrice} = useCart();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        removeItem(id);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleCheckout = () => {
        navigate("/cart/checkout");
    }

    const handleDecrease = (id) => {
        console.log(id);
    }

    const handleIncrease = (id) => {

    }

    return (
        <Box
            sx={{padding: 3}}
        >
            <Typography
                variant="h4"
                gutterBottom>
                Your Shopping Cart
            </Typography>
            <Paper
                sx={{
                    padding: 2,
                    marginBottom: 3,
                    backgroundColor: '#f9f9f9',
                    borderRadius: "30px"
                }}
            >
                {cartItems.length === 0 ? (
                    <Typography
                        variant="h6"
                        color="textSecondary"
                    >
                        Your cart is empty.
                    </Typography>
                ) : (
                    cartItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{marginBottom: 2}}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 3
                                    }}
                                >
                                    <Avatar
                                        alt={item.productName}
                                        src={item.images?.[0]?.data ? `data:image/jpeg;base64,${item.images[0].data}` : ''}
                                        sx={{width: 64, height: 64, border: '1px solid #ddd'}}
                                    />
                                    <Typography
                                        variant="h6"
                                    >
                                        {item.productName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleDecrease(item.id)}
                                    sx={{ borderRadius: "30px", minWidth: "36px" }}
                                >
                                    -
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRemove(item.id)}
                                    sx={{whiteSpace: 'nowrap', borderRadius: "30px"}}
                                >
                                    Remove
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleIncrease(item.id)}
                                    sx={{ borderRadius: "30px", minWidth: "36px" }}
                                >
                                    +
                                </Button>
                            </Box>
                            <Divider sx={{my: 2}}/>
                        </Box>
                    ))
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                        >
                            Total: {totalPrice}
                        </Typography>
                        <EuroIcon
                            fontSize="small"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClearCart}
                            sx={{borderRadius: "30px"}}
                        >
                            Clear Cart
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{borderRadius: "30px"}}
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
