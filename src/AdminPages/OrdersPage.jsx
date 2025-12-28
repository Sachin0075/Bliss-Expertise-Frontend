import { useState, useEffect } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://bliss-expertise-backend.onrender.com/api/orders`
        )
        const data = await response.json()
        setOrders(data) // Set the orders data in state
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders() // Call the fetchOrders function when component mounts
  }, [])

  return (
    <div className="orders-page">
      <h2 className="text-3xl font-bold text-center mb-8">Order List</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available.</p>
      ) : (
        <div className="orders-list space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card border p-4 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Order ID: {order._id}
              </h3>
              <div className="user-info mb-4">
                <p>
                  <strong>Name:</strong> {order.userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.userData.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.userData.address}
                </p>
              </div>
              <h4 className="text-xl font-semibold mb-2">Items:</h4>
              <div className="cart-items space-y-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="cart-item flex justify-between items-center border p-2 rounded-md"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="item-details ml-4 flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold mt-4">
                Total Amount: ₹{order.totalAmount}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
