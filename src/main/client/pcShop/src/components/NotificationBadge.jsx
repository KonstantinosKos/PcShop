import React from 'react';
import {Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCart from "../customHook/useCart.jsx";

const NotificationBadge = () => {
    const {cartItems} = useCart();

    return (
        <Badge
            badgeContent={cartItems.length}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            invisible={cartItems.length === 0} // Hides badge when cart is empty
        >
            <ShoppingCartIcon/>
        </Badge>
    );
};

export default NotificationBadge;
