import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext' // Import the useCart hook
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import axios from 'axios' // Import axios
import { motion } from 'framer-motion'

const Sales = () => {
  const { addToCart } = useCart()

  // State to store AC data fetched from API
  const [acData, setAcData] = useState([])

  // Fetch AC data from API on component mount
  useEffect(() => {
    axios
      .get(`https://bliss-expertise-backend.onrender.com/api/products`)
      .then((response) => {
        setAcData(response.data) // Store the fetched data in state
      })
      .catch((error) => {
        console.error('Error fetching AC data:', error)
        toast.error('Failed to load AC data.', {
          position: 'top-right',
        })
      })
  }, []) // Empty dependency array ensures it runs once when the component mounts

  const handleAddToCart = (ac) => {
    // Add the item to the cart context
    addToCart({ ...ac, quantity: 1 })

    // Show a success toast
    toast.success(`${ac.name} has been added to the cart!`, {
      position: 'top-right',
    })
  }

  return (
    <div className="container mx-auto p-12 mt-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Our Air Conditioners
      </h2>
      {console.log(acData)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {acData.length > 0 ? (
          acData.map((ac) => (
            <motion.div
              key={ac.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src={ac.img}
                alt={ac.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">{ac.name}</h3>
                <p className="text-gray-700">{ac.description}</p>
                <p className="text-gray-700">₹{ac.price}</p>

                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(ac)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/cart"
                    className="ml-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
                  >
                    Go to Cart
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center">Loading AC data...</p> // Show a loading message if data is still being fetched
        )}
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  )
}

export default Sales
