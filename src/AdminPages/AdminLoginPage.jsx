import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const name = 'Sachin Hadimani'

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/login',
        { email, password }
      )
      console.log(email)
      console.log(password)
      localStorage.setItem('adminToken', response.data.token) // Store the admin token
      toast.success('Admin Logged In')
      navigate('/admin/dashboard') // Redirect to admin dashboard after successful login
    } catch (err) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="mt-6">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/admin/signup" className="text-blue-500">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default AdminLoginPage
