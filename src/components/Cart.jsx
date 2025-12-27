import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    userData,
    setUserData,
  } = useCart()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleProceedToPayment = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items before proceeding.')
      return
    }
    // Pass the user data, cart items, and total amount to the /payment route
    navigate('/payment', {
      state: { userData, cartItems, totalAmount: getTotalAmount() },
    })
  }

  return (
    <div className="container mx-auto p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add some items to the cart.</p>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Items in your cart:</h3>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-2 flex items-center justify-between"
                >
                  <div>
                    <p>{item.name}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)} // Ensure we pass the item's unique id
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mt-4">
              Total Amount: ₹{getTotalAmount()}
            </h3>
          </div>

          <form onSubmit={handleProceedToPayment}>
            <div className="mb-4">
              <label htmlFor="name" className="block">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block">
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block">
                Your Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block">
                Your Address:
              </label>
              <textarea
                id="address"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="p-3 border rounded-lg w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      )}

      <div className="mt-6">
        <Link to="/sales" className="text-primary-600">
          Back to Shop
        </Link>
      </div>
    </div>
  )
}

export default Cart
