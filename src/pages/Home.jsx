import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import serviceimg from '../assets/AC_service_image.jpg';

const Home = () => {
    const { userData } = useCart();
    const [username, setUsername] = useState('Guest');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUsername(storedUserName);
        }
    }, []);

    const products = [
        { name: 'Samsung 1.5 Ton Split AC', price: '₹44,990', img: './assets/samsung.jpg' },
        { name: 'LG 1 Ton Window AC', price: '₹28,000', img: 'https://images.jdmagicbox.com/quickquotes/images_main/lg-1-0-ton-3-star-lwa12gwxa-window-ac-white-106489432-zbhji.jpg' },
        { name: 'Blue Star 1.5 Ton Split AC', price: '₹38,990', img: 'https://static.wixstatic.com/media/da977a_6d01fb1671d24bb6abbe7f414aaf2d12~mv2.jpg' },
        { name: 'Voltas 1.5 Ton Split AC', price: '₹36,500', img: 'https://m.media-amazon.com/images/I/61I6cDHskWL._SL1500_.jpg' },
    ];

    return (
        <div className="home-container mt-16">


            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center justify-center text-center p-10">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-black bg-opacity-50 p-10 rounded-2xl shadow-lg max-w-3xl"
                >
                    <h1 className="text-5xl font-extrabold mb-4">
                        Welcome{username !== `Guest` ? `, ${username}` : `, Guest`} to Bliss Air Conditioning Services
                    </h1>
                    <p className="text-lg mb-6">Your one-stop solution for all AC sales, services, and repairs.</p>
                    <Link to="/services" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition">Explore Our Services</Link>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6 text-center bg-gradient-to-r from-blue-500 to-purple-700 text-center text-white " >
                <h2 className="text-4xl font-bold mb-10 ">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[{ title: 'AC Repair', icon: '🔧', description: 'Quick and reliable repair services.' },
                    { title: 'AC Installation', icon: '🏠', description: 'Professional installation services.' },
                    { title: 'Cooling Issue', icon: '❄️', description: 'Restore optimal cooling performance.' },
                    { title: 'Maintenance', icon: '🛠️', description: 'Preventive maintenance services.' },
                    { title: 'Gas Filling', icon: '⛽', description: 'Top-quality gas refilling.' }].map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-110 transition duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <span className="text-6xl mb-4 block">{service.icon}</span>
                            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 px-6 bg-gradient-to-r from-blue-500 to-purple-700 text-center text-white">
                <h2 className="text-4xl font-bold mb-10">Featured AC Models</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <img src={product.img} alt={product.name} className="w-full h-56 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-blue-600 font-bold text-lg">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-6">
                    <Link to="/sales" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition">Explore More</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
