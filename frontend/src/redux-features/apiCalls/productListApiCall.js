import axios from 'axios'

const productsBaseURL = '/api/products'

const getAllProducts = async () => {
  const response = await axios.get(productsBaseURL)
  return response.data
}

const productsAPI = {
  getAllProducts,
}

export default productsAPI
