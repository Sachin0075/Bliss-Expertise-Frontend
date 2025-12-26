import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentData, setPaymentData] = useState(null); // New state for payment data

    // Add to cart function, ensuring items have unique ids
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Remove a specific item based on its id
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    // Update quantity of a specific item based on its id
    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
            )
        );
    };

    // Calculate total price of all items in the cart
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Clear the entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Set payment data (user data and total amount) for payment processing
    const setPaymentInfo = (userData, totalAmount) => {
        setPaymentData({ userData, totalAmount });
    };

    // Clear payment data after successful payment
    const clearPaymentInfo = () => {
        setPaymentData(null);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalAmount,
                setPaymentInfo, // New function to set payment data
                clearPaymentInfo, // New function to clear payment data
                paymentData, // Payment data for use in Payment Page
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
