import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()
  const { setUserData } = useCart()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      console.log('Email entered:', email)
      const response = await axios.get(
        'http://127.0.0.1:5000/api/users/verify',
        {
          params: { email, password },
        }
      )

      if (
        response.data &&
        response.data.message === 'User verified successfully'
      ) {
        const { name, email } = response.data
        console.log('Response Data:', response.data)
        const userResponse = await axios.get(
          'http://127.0.0.1:5000/api/users/details',
          {
            params: { email },
          }
        )

        console.log('User Details:', userResponse.data)
        const {
          name: userName,
          email: userEmail,
          address,
          phone,
          cart,
        } = userResponse.data
        setUserData((prevData) => ({
          ...prevData,
          name: userName,
          email: userEmail,
          address,
          phone,
          cart,
        }))
        localStorage.setItem('userName', userName)
        toast.success('Login successful!')
        navigate('/home')
      } else {
        toast.warning(response.data.message)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login. Please try again.')
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
        className="flex flex-col items-center justify-center px-8 py-12 mx-auto sm:max-w-md md:h-auto lg:py-0"
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
            Welcome Back!
          </h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <motion.input
                type="email"
                name="email"
                id="email"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:ring-2"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:bg-indigo-800 text-white font-medium rounded-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 transition duration-200 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </form>
          <div className="flex items-center justify-between mt-6">
            <Link
              to="/register"
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
            >
              Create an account
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Login
