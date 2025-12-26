import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-11 mt-auto">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Connect With Us</h3>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="tel:+1234567890"
            className="text-white hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
          >
            <i className="fas fa-phone-alt"></i> +91 7483104749
          </a>
          <a
            href="mailto:blissexpertisemlr@gmail.com"
            className="text-white hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
          >
            <i className="fas fa-envelope"></i> Ajay Kumar
          </a>
          <a
            href="https://www.instagram.com/bliss_expertise/?igsh=MTZwNDZxazQ5aDVraA%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black hover:text-lg transition-all duration-200 ease-in-out"
          >
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
        <div className="mb-5">
          <div>
            Opposite to Janatha lunch Home , B.V Road ,
            Kankandy,Mangaluru-575001{' '}
          </div>
        </div>
        <div className="text-sm text-white">
          <p>
            &copy; {new Date().getFullYear()} Bliss Enterprise. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
