import axios from "axios"

const productsBaseURL = "/api/products/"

const getSingleProduct = async (productId) => {
  const response = await axios.get(productsBaseURL + productId)

  return response.data
}

const singleProductAPI = {
  getSingleProduct,
}

export default singleProductAPI
