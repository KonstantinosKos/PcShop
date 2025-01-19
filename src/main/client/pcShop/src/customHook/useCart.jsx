import {useContext} from "react";
import {CartContext} from "../context/CartContext.jsx";

const useCart = () => {
    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error('No Cart');
    }
    return cart;
}

export default useCart;