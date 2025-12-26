import { useState, useEffect } from 'react'
import axios from 'axios'

const UserLoginManage = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users')
      console.log('Fetched users:', response.data) // Log the response data
      setUsers(response.data) // Set the fetched users into state
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers() // Fetch users when the component mounts
  }, [])

  const handleDeleteUser = async (userEmail) => {
    if (!userEmail) {
      console.error('User email is undefined')
      return
    }

    console.log('Attempting to delete user with email:', userEmail) // Check the passed email

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userEmail}`
      )
      console.log('User deleted:', response.data)
      fetchUsers() // Re-fetch users after deleting
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.email}>
              {' '}
              {/* Use email as the key */}
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.email)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No users available</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default UserLoginManage
