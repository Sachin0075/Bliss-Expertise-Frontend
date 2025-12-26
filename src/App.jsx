import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Sales from './pages/Sales';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Cart from './components/Cart';

import CartProvider from './context/CartContext';
import Payment from './pages/Payment';
import RazorpayPayment from './components/RazorpayPayment ';
import OrderConfirmation from './components/OrderConfirmation ';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './AdminPages/AdminPage'
import AdminLoginPage from './AdminPages/AdminLoginPage';
import AdminSignupPage from './AdminPages/AdminSignupPage';
function App() {
  return (
    <div>
      <CartProvider>
        <Router>
          <ToastContainer />
          <ScrollToTop />
          <Routes>
            {/* Default route redirects */}
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Application routes */}
            <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
            <Route path="/sales" element={<><Navbar /><Sales /><Footer /></>} />
            <Route path="/aboutus" element={<><Navbar /><AboutUs /><Footer /></>} />
            <Route path="/contactus" element={<><Navbar /><ContactUs /><Footer /></>} />
            <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
            <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />
            <Route path="/RazorpayPayment" element={<><Navbar /><RazorpayPayment /><Footer /></>} />
            <Route path="/order-confirmation" element={<><Navbar /><OrderConfirmation /><Footer /></>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/signup" element={<AdminSignupPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminPage />} />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;