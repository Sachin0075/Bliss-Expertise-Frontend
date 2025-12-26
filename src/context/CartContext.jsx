// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const resetCart = () => {
        setCartItems([]);
        setUserData({
            name: '',
            email: '',
            phone: '',
            address: '',
        });
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotalAmount,
            userData,
            setUserData,
            resetCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Default export CartProvider
export default CartProvider;
