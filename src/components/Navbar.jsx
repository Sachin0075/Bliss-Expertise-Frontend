import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Change background color on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${scrolled ? 'bg-blue-800' : 'bg-blue-600'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className='flex items-center'>
                    <Link to="/home" className="text-2xl font-bold text-white flex items-center hover:scale-105 transition-transform duration-300">
                        <img src={logo1} alt="Logo" className='bg-transparent h-20 w-20 mr-4 transform transition-all duration-300 hover:rotate-6' />
                        <div className='flex flex-col'>
                            <label htmlFor="logoname" className="text-xl font-semibold">BLISS EXPERTISE</label>
                            <div className='text-white text-sm font-medium'>One Stop for all your A.C needs</div>
                        </div>
                    </Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Navbar Links */}
                <div className={`md:flex space-x-6 ${isMenuOpen ? "block" : "hidden"} md:block`}>
                    <Link to="/home" className="text-white hover:text-blue-400 text-2xl font-bold transition-all duration-300 relative group">
                        Home
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/services" className="text-white hover:text-blue-400 text-2xl font-bold transition-all duration-300 relative group">
                        Services
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/sales" className="text-white hover:text-blue-400 text-2xl font-bold transition-all duration-300 relative group">
                        Sales
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/aboutus" className="text-white hover:text-blue-400 text-2xl font-bold transition-all duration-300 relative group">
                        About Us
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/contactus" className="text-white hover:text-blue-400 text-2xl font-bold transition-all duration-300 relative group">
                        Contact Us
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
