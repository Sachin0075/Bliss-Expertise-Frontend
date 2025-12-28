import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Retrieve total amount, user data, and cart items from state
  const { totalAmount, userData, cartItems } = location.state || {}

  // Dummy tax and delivery charges
  const TAX_RATE = 0.18 // 18% tax
  const DELIVERY_CHARGE = 50 // Fixed delivery charge

  // Calculate the tax and total
  const taxAmount = totalAmount * TAX_RATE
  const finalTotalAmount = totalAmount + taxAmount + DELIVERY_CHARGE

  // Redirect to cart if cartItems or totalAmount is missing
  if (!totalAmount || !cartItems || cartItems.length === 0) {
    alert('Cart is empty or data missing. Redirecting to cart.')
    navigate('/cart')
    return null
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    if (paymentMethod === 'cod') {
      alert('Cash on Delivery Selected')
      generateAndDownloadBill() // Generate and download bill when COD is selected
      postOrderData()
      navigate('/order-confirmation', { state: { finalTotalAmount, userData } })
    } else if (paymentMethod === 'upi') {
      setTimeout(() => {
        generateAndDownloadBill()
      }, 15000)
      navigate('/RazorpayPayment', {
        state: { finalTotalAmount, userData, cartItems },
      })
    }
  }

  const generateAndDownloadBill = () => {
    const doc = new jsPDF()
    doc.setFont('helvetica', 'normal')

    // Cart Items Table
    doc.setFontSize(12)
    doc.text('Order Bill', 14, 20)
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 25)

    // Cart Items Table
    doc.autoTable({
      startY: 30,
      head: [['Product', 'Price', 'Quantity', 'Total']],
      body: cartItems.map((item) => [
        item.name,
        `₹${item.price}`,
        item.quantity,
        `₹${(item.price * item.quantity).toFixed(2)}`,
      ]),
      margin: { top: 10, left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        tableWidth: 'auto',
      },
    })

    // Calculate and Display Total Product Amount
    const productTotalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    // Tax, Delivery Charge, and Final Total Table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Description', 'Amount']],
      body: [
        ['Product Total', `₹${productTotalAmount.toFixed(2)}`],
        ['Tax (18%)', `₹${taxAmount.toFixed(2)}`],
        ['Delivery Charge', `₹${DELIVERY_CHARGE}`],
        ['Total Amount', `₹${finalTotalAmount.toFixed(2)}`],
      ],
      margin: { top: 10, left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        tableWidth: 'auto',
      },
    })

    // Company Information at the End
    const yOffset = doc.lastAutoTable.finalY + 10
    doc.text('Bliss Expertise', 14, yOffset)
    doc.text('For more details, contact: +91 7483104749', 14, yOffset + 5)
    doc.text(
      'Ajay Kumar, Opposite to Janatha Lunch Home, B.V Road, Kankandy, Mangaluru-575001',
      14,
      yOffset + 10
    )

    // Download the PDF
    doc.save('order_bill.pdf')
  }

  const postOrderData = async () => {
    const orderData = {
      userData,
      cartItems,
      totalAmount: finalTotalAmount,
    }

    try {
      const response = await fetch(
        `https://bliss-expertise-backend.onrender.com/api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      )

      if (response.ok) {
        console.log('Order posted successfully')
      } else {
        console.log('Failed to post order')
      }
    } catch (error) {
      console.error('Error posting order:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Select Payment Method
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="cod"
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="cod" className="ml-2 text-gray-700">
              Cash on Delivery (COD)
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="upi"
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="upi" className="ml-2 text-gray-700">
              UPI Payment
            </label>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Proceed with Payment
        </button>
        <div className="mt-4 text-center">
          <Link to="/cart" className="text-blue-500 underline">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Payment
