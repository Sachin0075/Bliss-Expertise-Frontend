import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminSignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // Use useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/register',
        { email, password }
      )
      toast.success('Admin Created')
      navigate('/admin/login') // Redirect to login page after successful signup
    } catch (err) {
      toast.error('Error creating account')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center">Admin Signup</h2>
      <form onSubmit={handleSignup} className="mt-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

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
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default AdminSignupPage
