import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function SalesPage() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    // Fetch the products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/products`)
        const data = await response.json()

        // Get the maximum id from the fetched products
        const maxId = Math.max(...data.map((product) => product.id), 0)
        setId(maxId + 1) // Set the next available id
      } catch {
        toast.error('Error fetching products')
      }
    }

    fetchProducts()
  }, []) // Empty dependency array means this will run only once when the component mounts

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImgUrl(reader.result) // Convert to base64 URL
    }

    if (file) reader.readAsDataURL(file) // Read file as base64 URL
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      id,
      name,
      price,
      img: imgUrl, // Store the base64 image URL
      description,
    }

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.message === 'Product added successfully') {
        toast.success('Product added successfully!')
        setId('')
        setName('')
        setPrice('')
        setDescription('')
        setImgUrl('')
      } else {
        toast.error('Failed to add product.')
      }
    } catch {
      toast.error('Error occurred while adding product')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID will be automatically set based on backend data */}
        <input
          type="number"
          value={id}
          disabled
          placeholder="ID"
          className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mt-4"
          />
        )}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}
