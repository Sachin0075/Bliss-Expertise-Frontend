import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const payload = { name, email, phone, address, password }
    console.log('Registration payload:', payload)

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/users/register',
        payload
      )
      console.log('Registration response:', response)

      if (response.data.message === 'User registered successfully') {
        toast.success('Registration successful!')
        navigate('/login')
      } else {
        toast.warning(response.data.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Registration failed: ${error.response.data.message}`)
      } else {
        toast.error('An error occurred during registration. Please try again.')
      }
    }
  }

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-400 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center px-8 py-12 mx-auto sm:max-w-md md:h-auto lg:py-0 w-full max-w-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-white tracking-wider"
        >
          <motion.img
            className="w-16 h-16 mr-3"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            whileHover={{ scale: 1.1 }}
          />
          Bliss Expertise
        </a>
        <button
          onClick={toggleDarkMode}
          className="absolute top-5 right-5 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-900 dark:text-white"
            whileHover={{ scale: 1.1 }}
          >
            {isDarkMode ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m-7-7h1m16 0h1m-9-9a9 9 0 1110.61 14.29A7 7 0 0012 21v-2a5 5 0 10-5-5h-2a7 7 0 0114 0"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m-7-7h1m16 0h1m-9-9a9 9 0 1110.61 14.29A7 7 0 0012 21v-2a5 5 0 10-5-5h-2a7 7 0 0114 0"
              />
            )}
          </motion.svg>
        </button>
        <motion.div
          className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transform transition-transform duration-500 hover:scale-105"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Create Your Account
          </h1>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="flex space-x-4">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <motion.input
                  type="number"
                  name="phone"
                  id="phone"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                  placeholder="Your Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <motion.input
                type="email"
                name="email"
                id="email"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                placeholder="email@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Address
              </label>
              <motion.input
                type="text"
                name="address"
                id="address"
                placeholder="Your Address"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <motion.input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <motion.input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 transition duration-200 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </form>
          <div className="flex items-center justify-between mt-6">
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
            >
              Already have an account? Login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Register
