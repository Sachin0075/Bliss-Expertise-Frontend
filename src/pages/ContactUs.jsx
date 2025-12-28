import React, { useState } from 'react'
import axios from 'axios'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    message: '',
  })
  const [error, setError] = useState(null) // To store error message
  const [success, setSuccess] = useState(null) // To store success message

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send the POST request using axios
      const response = await axios.post(
        `https://bliss-expertise-backend.onrender.com/api/contact`,
        formData
      )

      if (response.status === 200) {
        setSuccess('Form submitted successfully!')
        setError(null)
        setFormData({
          name: '',
          email: '',
          number: '',
          address: '',
          message: '',
        }) // Reset form after successful submission
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      if (error.response) {
        setError(
          error.response.data.message ||
            'An error occurred while submitting the form.'
        )
      } else {
        setError('An error occurred while submitting the form.')
      }
      setSuccess(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Main content */}
      <div className="flex-grow container mx-auto p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center my-6">Contact Us</h1>
        <div className="flex justify-center">
          <form className="w-full max-w-lg text-black" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="mb-6">
              <label
                className="block text-gray-200 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email field */}
            <div className="mb-6">
              <label
                className="block text-gray-200 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Contact Number field */}
            <div className="mb-6">
              <label
                className="block text-gray-200 text-sm font-semibold mb-2"
                htmlFor="number"
              >
                Contact Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your Number"
                required
              />
            </div>

            {/* Address field */}
            <div className="mb-6">
              <label
                className="block text-gray-200 text-sm font-semibold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your Address"
                required
              />
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label
                className="block text-gray-200 text-sm font-semibold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Message for Us"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Display success or error message */}
        {success && (
          <div className="text-green-500 mt-4 text-center">{success}</div>
        )}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}

        {/* Google Map Embed */}
        <div className="mt-10 mb-10">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Our Location
          </h2>
          <div className="w-full h-96 mb-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.6496767328526!2d74.8553056!3d12.865888900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUxJzU3LjIiTiA3NMKwNTEnMTkuMSJF!5e0!3m2!1sen!2sin!4v1737058761103!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: '0', borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
