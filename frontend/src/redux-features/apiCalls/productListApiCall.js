import axios from 'axios'

const productsBaseURL = '/api/products'

const getAllProducts = async () => {
  const response = await axios.get(productsBaseURL)
  return response.data
}

const deleteProduct = async (productId, products) => {
  const token = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  await axios.delete(`${productsBaseURL}/${productId}`, config)

  const payload = products.filter((product) => product._id !== productId)

  // localStorage.setItem('products', JSON.stringify(payload))

  return payload
}

const productsAPI = {
  getAllProducts,
  deleteProduct,
}

export default productsAPI
