import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const RazorpayPayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userData, totalAmount, cartItems } = location.state
  const { clearCart } = useCart()
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = initializeRazorpay
      document.body.appendChild(script)
    } else {
      initializeRazorpay()
    }
  }, [])

  const initializeRazorpay = () => {
    const options = {
      key: 'rzp_test_Ej3COv0XuhUQpZ', // Razorpay Key
      amount: totalAmount * 100 + 4000, // Convert amount to paise
      currency: 'INR',
      name: 'BLISS EXPERTISE',
      description: `Payment for Order #${new Date().getTime()}`,
      image: logo,
      handler: async function (response) {
        console.log('Payment Successful:', response)

        toast.success('Payment Success!', {
          position: 'top-right',
        })

        // Post order details
        try {
          const isOrderPosted = await postOrderData()

          if (isOrderPosted) {
            console.log('Order posted successfully. Generating Bill...')

            // Clear cart after successful order post
            clearCart()

            // Generate Bill
            generateBillPDF()

            // Mark payment as completed
            setPaymentCompleted(true)

            // Redirect to Order Confirmation
            setTimeout(() => {
              navigate('/order-confirmation', {
                state: { totalAmount, userData },
              })
            }, 1500)
          } else {
            toast.error('Failed to save order. Please contact support.')
            console.log('Order post failed!')
          }
        } catch (error) {
          console.error('Error posting order:', error)
          toast.error('Something went wrong! Try again.')
        }
      },
      modal: {
        ondismiss: function () {
          toast.error('Transaction Cancelled!', {
            position: 'top-right',
          })
          navigate('/sales')
          window.location.reload()
        },
      },
      prefill: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
      notes: {
        address: userData.address,
      },
      theme: {
        color: '#F37254',
      },
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()

    rzp1.on('payment.failed', function (response) {
      console.error('Payment Failed:', response)
      toast.error('Payment Failed! Try Again.', {
        position: 'top-right',
      })
      navigate('/sales')
      window.location.reload()
    })
  }
}

export default RazorpayPayment
