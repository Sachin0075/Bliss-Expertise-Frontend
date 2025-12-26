import { useState, useEffect } from 'react'
import SalesPage from './SalesPage'
import UserLoginPage from './UserLoginManage'
import UserContactPage from './UserContactPage'
import OrdersPage from './OrdersPage' // Import OrdersPage

export default function AdminPage() {
  const [selectedPage, setSelectedPage] = useState('sales')

  return (
    <div className="admin-page max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="admin-header text-center text-4xl font-bold text-blue-600 mb-8">
        Admin Dashboard
      </h1>

      <div className="admin-options flex justify-center space-x-4 mb-8">
        <button
          className="option-button px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setSelectedPage('sales')}
        >
          Add Product
        </button>
        <button
          className="option-button px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setSelectedPage('userlogin')}
        >
          User Login
        </button>
        <button
          className="option-button px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setSelectedPage('usercontact')}
        >
          User Contact
        </button>
        <button
          className="option-button px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setSelectedPage('orders')}
        >
          Orders
        </button>
      </div>

      <div className="admin-content bg-white p-6 rounded-lg shadow-md">
        {selectedPage === 'sales' && <SalesPage />}
        {selectedPage === 'userlogin' && <UserLoginPage />}
        {selectedPage === 'usercontact' && <UserContactPage />}
        {selectedPage === 'orders' && <OrdersPage />}{' '}
        {/* Display OrdersPage here */}
      </div>
    </div>
  )
}
