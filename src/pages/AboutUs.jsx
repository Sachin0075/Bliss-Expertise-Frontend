import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="container my-10 mt-20 mx-auto p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white ">
      {/* Why Choose Bliss Expertise Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Why Choose Bliss Expertise For AC Repair
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {/* Certified Technicians Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-cogs text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">
              Certified Technicians
            </h3>
            <p className="text-gray-700">
              All AC technicians at Bliss Expertise are certified and
              well-trained to repair your AC impeccably.
            </p>
          </div>

          {/* On-time Repair Service Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-clock text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">
              On-time Repair Service
            </h3>
            <p className="text-gray-700">
              We value your time and adhere to the promised timeline, whether
              for inquiry response or service delivery.
            </p>
          </div>

          {/* Transparent Prices Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-indian-rupee-sign text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Transparent Prices</h3>
            <p className="text-gray-700">
              We offer transparent pricing for major AC repair services, so you
              can rest assured that you are charged fairly.
            </p>
          </div>

          {/* Hassle-Free Process Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-paper-plane text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Hassle-Free Process</h3>
            <p className="text-gray-700">
              You can make an online appointment to get technicians at your
              doorstep for a hassle-free repair service.
            </p>
          </div>

          {/* 30 Days Service Warranty Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-shield-alt text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">
              30 Days Service Warranty
            </h3>
            <p className="text-gray-700">
              We aim to provide our customers with complete satisfaction,
              offering a service warranty of 30 days.
            </p>
          </div>

          {/* Prompt Customer Support Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
            <i className="fas fa-headset text-4xl text-primary-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">
              Prompt Customer Support
            </h3>
            <p className="text-gray-700">
              You can contact us through our hotline number or online channels
              for prompt and personalized support.
            </p>
          </div>
        </div>
      </div>

      {/* AC Sales Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">
          AC Sales - Find Your Perfect Air Conditioner
        </h2>
        <p className="text-lg text-white mb-6 text-center">
          Looking for a new air conditioner? We offer a wide range of air
          conditioners, from split units to window models, all available at
          competitive prices. Choose from top brands and get your perfect AC
          today.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition">
          <Link to="/services" className="w-full h-full block">
            Explore Our Services
          </Link>
        </button>
      </div>
    </div>
  )
}

export default AboutUs
