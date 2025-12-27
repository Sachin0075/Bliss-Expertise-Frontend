// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//     const [formData, setFormData] = useState({}); // State to store form data

//     const addToCart = (item) => {
//         const exists = cartItems.find(cartItem => cartItem.id === item.id);
//         if (exists) {
//             updateQuantity(item.id, exists.quantity + 1);
//         } else {
//             setCartItems((prevItems) => [...prevItems, item]);
//         }
//     };

//     const removeFromCart = (itemId) => {
//         setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//     };

//     const updateQuantity = (itemId, quantity) => {
//         setCartItems((prevItems) =>
//             prevItems.map((item) =>
//                 item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
//             )
//         );
//     };

//     const getTotalAmount = () => {
//         return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     };

//     const clearCart = () => {
//         setCartItems([]);
//     };

//     const saveFormData = (data) => {
//         setFormData(data);
//     };

//     const getFormData = () => {
//         return formData;
//     };

//     return (
//         <CartContext.Provider
//             value={{
//                 cartItems,
//                 addToCart,
//                 removeFromCart,
//                 updateQuantity,
//                 clearCart,
//                 getTotalAmount,
//                 saveFormData,
//                 getFormData
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]) // Default empty cart

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Update the quantity of an item in the cart
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    }
  }

  // Calculate the total amount
  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
