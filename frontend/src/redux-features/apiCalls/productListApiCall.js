import axios from 'axios'

const productsBaseURL = '/api/products'

const getAllProducts = async () => {
  const response = await axios.get(productsBaseURL)
  return response.data
}

const getProductById = async (productId) => {
  const { data } = await axios.get(`${productsBaseURL}/${productId}`)

  return data
}

const createProduct = async (productInfo, allProducts) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  let {
    products: { data: productArray },
  } = allProducts

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  let {
    data: { data },
  } = await axios.post(`${productsBaseURL}`, productInfo, config)

  let payload = [...productArray, data]

  return payload
}

const updateProduct = async (productInfo) => {
  const { updateProductInfo, productId } = productInfo
  const token = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  let { data } = await axios.put(
    `${productsBaseURL}/${productId}`,
    updateProductInfo,
    config
  )

  data['isSuccess'] = true

  return data
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

  return payload
}

const productsAPI = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}

export default productsAPI
