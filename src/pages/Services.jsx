import React, { useState } from 'react'
import {
  FaTools,
  FaGasPump,
  FaSnowflake,
  FaFilter,
  FaVolumeMute,
  FaTrashAlt,
  FaCogs,
  FaAirFreshener,
  FaExclamationTriangle,
} from 'react-icons/fa'
import MaintenanceIcon from '../assets/MaintenanceIcon'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Services = () => {
  const acTypes = [
    'Split AC',
    'Window AC',
    'Central AC',
    'Portable AC',
    'Hybrid AC',
  ]
  const services = [
    {
      id: 1,
      acType: 'Split AC',
      title: 'AC Installation',
      description: 'Installation service for Split AC.',
      icon: <FaCogs />,
    },
    {
      id: 2,
      acType: 'Split AC',
      title: 'AC Repair',
      description: 'Repair services for Split AC.',
      icon: <FaTools />,
    },
    {
      id: 3,
      acType: 'Window AC',
      title: 'AC Maintenance',
      description: 'Maintenance service for Window AC.',
      icon: <MaintenanceIcon />,
    },
    {
      id: 4,
      acType: 'Central AC',
      title: 'AC Gas Filling',
      description: 'Gas filling service for Central AC.',
      icon: <FaGasPump />,
    },
    {
      id: 5,
      acType: 'Portable AC',
      title: 'Cooling Issue Fix',
      description: 'Cooling issue fix for Portable AC.',
      icon: <FaSnowflake />,
    },
    {
      id: 6,
      acType: 'Hybrid AC',
      title: 'AC Filter Cleaning',
      description: 'Filter cleaning service for Hybrid AC.',
      icon: <FaFilter />,
    },
    {
      id: 7,
      acType: 'Split AC',
      title: 'AC Noise Reduction',
      description: 'Noise reduction service for Split AC.',
      icon: <FaVolumeMute />,
    },
    {
      id: 8,
      acType: 'Window AC',
      title: 'AC Duct Cleaning',
      description: 'Duct cleaning service for Window AC.',
      icon: <FaAirFreshener />,
    },
    {
      id: 9,
      acType: 'Central AC',
      title: 'AC Replacement',
      description: 'Replacement service for Central AC.',
      icon: <FaTrashAlt />,
    },
    {
      id: 10,
      acType: 'Portable AC',
      title: 'Emergency AC Service',
      description: 'Emergency service for Portable AC.',
      icon: <FaExclamationTriangle />,
    },
  ]

  const [selectedACType, setSelectedACType] = useState('')

  const handleSelectChange = (e) => {
    setSelectedACType(e.target.value)
  }

  const filteredServices = selectedACType
    ? services.filter((service) => service.acType === selectedACType)
    : services

  return (
    <div className="container mx-auto p-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-3xl font-bold text-center mb-6 ">
        Select Your AC Type
      </h1>
      <div className="flex justify-center mb-8">
        <select
          value={selectedACType}
          onChange={handleSelectChange}
          className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-black"
        >
          <option value="">All AC Types</option>
          {acTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        {selectedACType ? `Services for ${selectedACType}` : 'All Services'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            className="border rounded-lg p-4 shadow-lg text-center bg-white text-black transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-6xl text-primary-600 mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-800 mb-4">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services
