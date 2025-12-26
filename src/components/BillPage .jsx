const BillPage = ({ location }) => {
  const { totalAmount, userData, cartItems } = location.state // Access bill data passed from Razorpay

  return (
    <div>
      <h1>Order Bill</h1>
      <h3>Customer: {userData.name}</h3>
      <h4>Email: {userData.email}</h4>
      <h4>Address: {userData.address}</h4>

      <h3>Items:</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>

      <h3>Total Amount: ₹{totalAmount}</h3>
    </div>
  )
}

export default BillPage
