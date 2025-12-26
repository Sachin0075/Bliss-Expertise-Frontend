import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TestToast = () => {
  const triggerToast = () => {
    toast.success('Test toast!')
  }

  return (
    <div>
      <button onClick={triggerToast}>Trigger Toast</button>
      <ToastContainer />
    </div>
  )
}

export default TestToast
