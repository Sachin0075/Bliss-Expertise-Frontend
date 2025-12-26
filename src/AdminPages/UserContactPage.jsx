import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserContactPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/userdata')
        setUsers(response.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching users')
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-700 mt-12">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500 mt-12">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        User Contact Information
      </h1>

      {/* Grid layout for user data */}
      {users.length === 0 ? (
        <div className="text-center text-lg text-gray-700">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {user.name || 'No Name Provided'}
              </h3>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {user.number || 'No Phone Provided'}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong>{' '}
                {user.address || 'No Address Provided'}
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong>{' '}
                {user.message || 'No Message Provided'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserContactPage
