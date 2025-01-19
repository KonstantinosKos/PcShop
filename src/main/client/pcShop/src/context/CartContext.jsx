import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = sessionStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [totalPrice, setTotalPrice] = useState(() => {
        const savedTotal = sessionStorage.getItem('totalPrice');
        return savedTotal ? parseFloat(savedTotal) : 0;
    });

    const addItem = (item) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems, item];
            saveToSessionStorage(updatedItems, totalPrice);
            return updatedItems;
        });
        setTotalPrice((prevTotal) => {
            const updatedTotal = prevTotal + item.price;
            sessionStorage.setItem('totalPrice', updatedTotal.toFixed(2));
            return updatedTotal;
        });
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            const updatedTotal = updatedItems.reduce((acc, item) => acc - item.price , 0);
            saveToSessionStorage(updatedItems, updatedTotal);
            return updatedItems;
        });
        setTotalPrice((prevTotal) => {
            const updatedTotal = cartItems.reduce(
                (acc, item) => (item.id === id ? acc : acc + item.price ),
                0
            );
            sessionStorage.setItem('totalPrice', updatedTotal.toFixed(2));
            return updatedTotal;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('totalPrice');
    };

    const saveToSessionStorage = (items, total) => {
        sessionStorage.setItem('cartItems', JSON.stringify(items));
        sessionStorage.setItem('totalPrice', total.toFixed(2));
    };

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
